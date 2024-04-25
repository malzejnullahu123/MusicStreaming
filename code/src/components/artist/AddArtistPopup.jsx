import React, { useState } from "react";
import ApiService from "../../axios/AxiosService";

const AddArtistPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    artistName: "",
    imageUrl: ""
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make API call to register artist
      await ApiService.registerArtist({ name: formData.artistName, embedImgLink: formData.imageUrl });

      // Reset form fields
      setFormData({ artistName: "", imageUrl: "" });
      // Close the popup
      onClose();
    } catch (error) {
      console.error("Error registering artist:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="popup-container bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add Artist</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="artistName" className="block text-sm font-medium text-gray-700">
              Artist Name
            </label>
            <input
              type="text"
              id="artistName"
              name="artistName"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter artist name"
              value={formData.artistName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArtistPopup;
