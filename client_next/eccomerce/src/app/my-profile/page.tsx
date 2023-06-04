import React from "react";

const page = () => {
  return (
    <>
      <div className="container mx-auto pt-28 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
              alt="Profile Picture"
              className="profile-img rounded-full mr-4 h-28 w-28"
            />
            <div>
              <h2 className="text-3xl font-semibold text-purple-text">
                John Doe
              </h2>
              <p className="text-gray-600">Software Developer</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-purple-text">
            User Information
          </h3>
          <div className="mt-2 text-gray-600">
            <p>
              <strong>Name:</strong> John Doe
            </p>
            <p>
              <strong>Email:</strong> john.doe@example.com
            </p>
            <p>
              <strong>Region:</strong> North America
            </p>
            <p>
              <strong>City:</strong> New York
            </p>
            <p>
              <strong>Nation:</strong> United States
            </p>
            <p>
              <strong>Country:</strong> USA
            </p>
          </div>
          <div className="mt-4">
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-purple-text">
            Recent Orders
          </h3>
          <table className="mt-4 w-full border-collapse order-table">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300">Order ID</th>
                <th className="border-b-2 border-gray-300">Product</th>
                <th className="border-b-2 border-gray-300">Quantity</th>
                <th className="border-b-2 border-gray-300">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-gray-300">1</td>
                <td className="border-b border-gray-300">Product A</td>
                <td className="border-b border-gray-300">2</td>
                <td className="border-b border-gray-300">$20</td>
              </tr>
              <tr>
                <td className="border-b border-gray-300">2</td>
                <td className="border-b border-gray-300">Product B</td>
                <td className="border-b border-gray-300">1</td>
                <td className="border-b border-gray-300">$10</td>
              </tr>
              <tr>
                <td className="border-b border-gray-300">3</td>
                <td className="border-b border-gray-300">Product C</td>
                <td className="border-b border-gray-300">3</td>
                <td className="border-b border-gray-300">$30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default page;
