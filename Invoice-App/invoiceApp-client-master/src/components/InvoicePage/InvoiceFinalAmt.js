import React from "react";

const InvoiceFinalAmt = ({
  invoiceCreaterName,
  invoiceCreaterRole,
  totalFinalAmt,
}) => {
  return (
    <>
      {/* here employee name who generated invoice & final amount*/}
      <div className="mb-4 d-flex justify-content-between">
        <div className=" d-flex flex-column ">
          <div>Generated By : </div>
          <div className="text-muted ms-2">
            {invoiceCreaterName} ({invoiceCreaterRole})
          </div>
        </div>
        <div className=" d-flex flex-column ">
          <div>Final Amount:</div>
          <div className=" fw-bold">₹ {totalFinalAmt}</div>
        </div>
      </div>
    </>
  );
};

export default InvoiceFinalAmt;