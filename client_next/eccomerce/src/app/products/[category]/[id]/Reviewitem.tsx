import React from "react";
interface Props {}
const Reviewitem = ({}: Props) => {
  return (
    <>
      <div className="bg-white my-3 rounded-lg shadow-md p-4">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 mr-3">
            <img
              className="w-10 h-10 rounded-full"
              src="reviewer-avatar.jpg"
              alt="Reviewer Avatar"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-gray-600">June 12, 2023</p>
          </div>
        </div>

        <p className="text-gray-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at
          felis pharetra, pharetra tellus in, dapibus ex. In vestibulum
          tincidunt lectus, in ultrices orci laoreet id.
        </p>

        <div className="flex items-center mt-4">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-500 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2.162L12.87 6.9l4.878.708-3.536 3.444.832 4.865L10 14.697l-4.444 2.29.833-4.865L3.13 7.608 7 2.87 10 7.607l3.869-4.738z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-500 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2.162L12.87 6.9l4.878.708-3.536 3.444.832 4.865L10 14.697l-4.444 2.29.833-4.865L3.13 7.608 7 2.87 10 7.607l3.869-4.738z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-500 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2.162L12.87 6.9l4.878.708-3.536 3.444.832 4.865L10 14.697l-4.444 2.29.833-4.865L3.13 7.608 7 2.87 10 7.607l3.869-4.738z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              className="w-4 h-4 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2.162L12.87 6.9l4.878.708-3.536 3.444.832 4.865L10 14.697l-4.444 2.29.833-4.865L3.13 7.608 7 2.87 10 7.607l3.869-4.738z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              className="w-4 h-4 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2.162L12.87 6.9l4.878.708-3.536 3.444.832 4.865L10 14.697l-4.444 2.29.833-4.865L3.13 7.608 7 2.87 10 7.607l3.869-4.738z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <span className="text-sm text-gray-600 ml-2">(4.5)</span>
        </div>
      </div>
    </>
  );
};

export default Reviewitem;
