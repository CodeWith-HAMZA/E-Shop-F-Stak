import React, { Fragment } from "react";
import Reviewitem from "./Reviewitem";

const Reviews = () => {
  return (
    <>
      <div className="bg-gray-100  py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
          <div className="bg-white rounded-lg shadow-md p-4 mt-4">
            <h3 className="text-lg font-semibold mb-2">Post a Review</h3>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              rows={4}
              placeholder="Write your review here..."
            ></textarea>
            <button className="mt-4 bg-violet-700 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded">
              Post Review
            </button>
          </div>
          {Array.from({ length: 6 }).map((review, idx) => (
            <Fragment key={idx}>
              <Reviewitem />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
