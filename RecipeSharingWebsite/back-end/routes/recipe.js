const Recipe = require("../models/Recipe");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const checkRole = require("../middleware/role");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

require("dotenv").config();

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add Recipe
router.post(
  "/recipes",
  authMiddleware,
  checkRole(["admin"]),
  upload.array("media"),
  async (req, res) => {
    const { title, description, ingredients, instructions, category } = req.body;
    try {
      // Upload media files to Cloudinary
      const mediaUrls = await Promise.all(
        req.files.map(async (file) => {
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                resource_type: "auto",
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
              }
            );
            uploadStream.end(file.buffer);
          });
        })
      );

      const newRecipe = new Recipe({
        title,
        description,
        ingredients: ingredients.split(","),
        instructions,
        category,
        images: mediaUrls.filter(
          (url) => url.endsWith(".jpg") || url.endsWith(".png")
        ),
        videos: mediaUrls.filter(
          (url) => url.endsWith(".mp4") || url.endsWith(".mov")
        ),
        user: req.userId,
      });

      await newRecipe.save();
      res.json({ message: "Recipe added" });
    } catch (error) {
      res.json({ message: error.message });
    }
  }
);

// Get Recipes
router.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user");
    res.json(recipes);
  } catch (error) {
    res.json({ message: error.message });
  }
});


// // Fetch Recipes with user role
// router.get('/recipes', authMiddleware, async (req, res) => {
//   try {
//       const recipes = await Recipe.find().populate('user', 'role'); // Populate user with role field
//       const userId = req.user._id; // Assuming req.user is set by auth middleware
//       const userRole = req.user.role; // Assuming req.user.role is set by auth middleware

//       const modifiedRecipes = recipes.map(recipe => ({
//           ...recipe.toObject(),
//           canEdit: userRole === 'admin',
//           canDelete: userRole === 'admin',
//       }));

//       res.json(modifiedRecipes);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//   }
// });


// // Fetch Recipes
// router.get('/recipes', authMiddleware, async (req, res) => {
//   try {
//       const recipes = await Recipe.find().populate('user', 'role'); // Populate user and only select 'role'
//       const userId = req.user._id; // Assuming user ID is stored in req.user after authentication

//       const modifiedRecipes = recipes.map(recipe => {
//           const canEdit = recipe.user._id.equals(userId); // Only owner can edit
//           const canDelete = recipe.user._id.equals(userId); // Only owner can delete
//           return {
//               ...recipe.toObject(),
//               canEdit,
//               canDelete,
//           };
//       });

//       res.json(modifiedRecipes);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//   }
// });


// // Get Recipes
// router.get("/recipes", authMiddleware, async (req, res) => {
//   try {
//     const recipes = await Recipe.find().populate("user");
//     const userRole = req.user.role; // Assuming role is stored in user object after authentication
//     const filteredRecipes = recipes.map(recipe => {
//       // Check if user is admin to allow editing and deletion
//       if (userRole === "admin") {
//         return {
//           ...recipe._doc,
//           canEdit: true,
//           canDelete: true
//         };
//       } else {
//         return {
//           ...recipe._doc,
//           canEdit: false,
//           canDelete: false
//         };
//       }
//     });
//     res.json(filteredRecipes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// Get Recipe by ID
router.get("/recipes/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  try {
    const recipe = await Recipe.findById(recipeId).populate("user");
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Update Recipe
router.put(
  "/recipes/:recipeId",
  authMiddleware,
  checkRole(["admin"]),
  upload.array("media"),
  async (req, res) => {
    const { recipeId } = req.params;
    const { title, description, ingredients, instructions, category } = req.body;

    try {
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      // Upload new media files to Cloudinary
      const mediaUrls = await Promise.all(
        req.files.map(async (file) => {
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                resource_type: "auto",
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
              }
            );
            uploadStream.end(file.buffer);
          });
        })
      );

      // Update the recipe with new data
      const updatedData = {
        title,
        description,
        ingredients: ingredients ? ingredients.split(",") : recipe.ingredients,
        instructions,
        category,
        images: mediaUrls.filter(
          (url) => url.endsWith(".jpg") || url.endsWith(".png")
        ).length
          ? mediaUrls.filter((url) => url.endsWith(".jpg") || url.endsWith(".png"))
          : recipe.images,
        videos: mediaUrls.filter(
          (url) => url.endsWith(".mp4") || url.endsWith(".mov")
        ).length
          ? mediaUrls.filter((url) => url.endsWith(".mp4") || url.endsWith(".mov"))
          : recipe.videos,
      };

      await Recipe.findByIdAndUpdate(recipeId, updatedData);
      res.json({ message: "Recipe updated" });
    } catch (error) {
      console.error("Error updating recipe:", error);
      res.status(500).json({ message: "Error updating recipe", error: error.message });
    }
  }
);

// // Delete Recipe
// router.delete(
//   "/recipes/:recipeId",
//   authMiddleware,
//   checkRole(["admin"]),
//   async (req, res) => {
//     const { recipeId } = req.params;
//     try {
//       const recipe = await Recipe.findById(recipeId);
//       if (!recipe) {
//         return res.status(404).json({ message: "Recipe not found" });
//       }

//       await recipe.remove(); // Remove the recipe document
//       res.json({ message: "Recipe deleted" });
//     } catch (error) {
//       console.error("Error deleting recipe:", error);
//       res.status(500).json({ message: "Error deleting recipe", error: error.message });
//     }
//   }
// );


// Delete Recipe
router.delete(
  "/recipes/:recipeId",
  authMiddleware,
  checkRole(["admin"]),
  async (req, res) => {
    const { recipeId } = req.params;
    try {
      const recipe = await Recipe.findOneAndDelete({ _id: recipeId });
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
      console.error("Error deleting recipe:", error);
      res.status(500).json({ message: "Error deleting recipe", error: error.message });
    }
  }
);


module.exports = router;
