import React from "react";

const page = () => {
  const images = [
    "",
    "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-260nw-1714666150.jpg",
  ];
  return (
    <>
      <React.Fragment>
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl font-semibold mb-6">
                Welcome to Our Store
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                auctor neque sit amet semper tempus. Duis vel sem est.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia Curae; Aliquam id mauris vel sapien consectetur
                semper. Mauris eu urna id ligula iaculis malesuada nec non
                purus.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Vestibulum ac arcu id erat bibendum eleifend vitae ac augue.
                Phasellus hendrerit orci sit amet augue ultricies, sed tincidunt
                ipsum efficitur. Ut blandit semper justo, vitae sagittis nulla
                vulputate id. Maecenas ac orci semper, mollis odio vitae,
                suscipit ante. Fusce suscipit rutrum tortor at consectetur.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia Curae.
              </p>
              <p className="text-lg text-gray-700">
                Nullam ultrices tellus a felis venenatis semper. Fusce
                efficitur, sem nec cursus gravida, ex orci tempus mauris, in
                vestibulum velit leo eget odio. Pellentesque tempor gravida eros
                at auctor. Quisque aliquet nisi orci, in aliquam lorem
                scelerisque non. Fusce eu lacinia turpis. Vivamus suscipit
                vestibulum pretium. In eu nisl nec tortor hendrerit lobortis.
                Curabitur ac commodo risus, nec lacinia enim.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="./about.jpg"
                alt="About Us"
                className="rounded-lg shadow-lg w-full h-auto object-cover lg:max-w-md"
              />
            </div>
          </div>
        </main>

        <section className="bg-gray-200 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-6">
              Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center mb-4">
                  <img
                    src={images[1]}
                    alt="Team Member"
                    className="w-32 h-32 object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">John Doe</h3>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center mb-4">
                  <img
                    src={images[1]}
                    alt="Team Member"
                    className="w-32 h-32 object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">Jane Smith</h3>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center mb-4">
                  <img
                    src={images[1]}
                    alt="Team Member"
                    className="w-32 h-32 object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">Alex Johnson</h3>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center mb-4">
                  <img
                    src={images[1]}
                    alt="Team Member"
                    className="w-32 h-32 object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">Emily Davis</h3>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    </>
  );
};

export default page;
