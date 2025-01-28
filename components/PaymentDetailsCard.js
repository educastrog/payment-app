'use client';

export default function PaymentDetailsCard() {
  const policyDetails = {
    petName: "Max",
    policyType: "Basic Pet Insurance",
    coverage: "$1,000,000",
    monthlyPayment: "$29.99",
    startDate: "2025-02-01",
    coverageIncludes: [
      "Accidents & Injuries",
      "Emergency Care",
      "Surgery",
      "Prescribed Medications"
    ]
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">
          Policy Details
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-gray-600">
            <span className="font-semibold">Pet Name:</span> {policyDetails.petName}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Policy Type:</span> {policyDetails.policyType}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Coverage Amount:</span> {policyDetails.coverage}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Monthly Premium:</span> {policyDetails.monthlyPayment}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Effective Date:</span> {policyDetails.startDate}
          </p>
          <div className="mt-4">
            <p className="font-semibold text-gray-600">Coverage Includes:</p>
            <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
              {policyDetails.coverageIncludes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}