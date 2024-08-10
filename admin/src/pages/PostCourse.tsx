import { useEffect, useState } from "react";
import { Loader2, PlusIcon, XIcon } from "lucide-react";
import { api } from "../utils/config";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Course } from "../types/interfaces";

const AddCourseForm = () => {
  const [course, setCourse] = useState<Course>({
    title: "",
    description: "",
    price: "",
    image: null,
    duration: "",
    resource: "",
    priceid: "",
    sections: [
      {
        title: "",
        resources: "",
        videos: [
          {
            name: "",
            link: "",
          },
        ],
      },
    ],
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setCourse({ ...course, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSection = () => {
    setCourse({
      ...course,
      sections: [...course.sections, { title: "", resources: "", videos: [] }],
    });
  };

  const removeSection = (index: number) => {
    const newSections = course.sections.filter((_, i) => i !== index);
    setCourse({ ...course, sections: newSections });
  };

  const handleSectionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSections = course.sections.map((section, i) => {
      if (i === index) {
        return { ...section, [e.target.name]: e.target.value };
      }
      return section;
    });
    setCourse({ ...course, sections: newSections });
  };

  const addVideo = (sectionIndex: number) => {
    const newSections = course.sections.map((section, i) => {
      if (i === sectionIndex) {
        return {
          ...section,
          videos: [...section.videos, { name: "", link: "", completed: false }],
        };
      }
      return section;
    });
    setCourse({ ...course, sections: newSections });
  };

  const removeVideo = (sectionIndex: number, videoIndex: number) => {
    const newSections = course.sections.map((section, i) => {
      if (i === sectionIndex) {
        const newVideos = section.videos.filter((_, vi) => vi !== videoIndex);
        return { ...section, videos: newVideos };
      }
      return section;
    });
    setCourse({ ...course, sections: newSections });
  };

  const handleVideoChange = (
    sectionIndex: number,
    videoIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSections = course.sections.map((section, i) => {
      if (i === sectionIndex) {
        const newVideos = section.videos.map((video, vi) => {
          if (vi === videoIndex) {
            return { ...video, [e.target.name]: e.target.value };
          }
          return video;
        });
        return { ...section, videos: newVideos };
      }
      return section;
    });
    setCourse({ ...course, sections: newSections });
  };

  const submitCourse = async () => {
    try {
      setIsSubmiting(true);
      // Here you would typically send the course data to your backend
      console.log("Submitting course:", course);

      const sectionsJSON = JSON.stringify(course.sections);

      const formData = new FormData();
      formData.append("image", course.image as File);
      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("price", course.price);
      formData.append("duration", course.duration);
      formData.append("resource", course.resource);
      formData.append("priceid", course.priceid);
      formData.append("sections", sectionsJSON);

      const response = await api.post("/admin/postCourse", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      if (response) {
        navigate("/cms");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmiting(false);
    }
  };

  async function getProfile() {
    try {
      await api.get("/admin/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    } catch (error) {
      navigate("/");
      console.log(error);
    }
  }

  useEffect(() => {
    getProfile();
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
                Create New Course
              </h1>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Course Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={course.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={3}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={course.description}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={course.price}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Duration (hours)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      id="duration"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={course.duration}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="resource"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Resources
                    </label>
                    <input
                      type="number"
                      name="resource"
                      id="resource"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={course.resource}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="priceid"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Price ID
                    </label>
                    <input
                      type="text"
                      name="priceid"
                      id="priceid"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={course.priceid}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="imageUpload"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Course Image
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
                  />

                  {previewUrl && (
                    <div className="mt-4">
                      <img
                        src={previewUrl}
                        alt="Course preview"
                        className="max-w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Course Sections
                  </h3>
                  {course.sections.map((section, sectionIndex) => (
                    <div
                      key={sectionIndex}
                      className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-lg font-medium text-indigo-600">
                          Section {sectionIndex + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeSection(sectionIndex)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-150"
                        >
                          <XIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <input
                          type="text"
                          name="title"
                          placeholder="Section Title"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          value={section.title}
                          onChange={(e) => handleSectionChange(sectionIndex, e)}
                        />
                        <input
                          type="text"
                          name="resources"
                          placeholder="Resources"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          value={section.resources}
                          onChange={(e) => handleSectionChange(sectionIndex, e)}
                        />
                      </div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Videos
                      </h5>
                      {section.videos.map((video, videoIndex) => (
                        <div
                          key={videoIndex}
                          className="flex items-center space-x-2 mb-2"
                        >
                          <input
                            type="text"
                            name="name"
                            placeholder="Video Name"
                            required
                            className="flex-grow px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={video.name}
                            onChange={(e) =>
                              handleVideoChange(sectionIndex, videoIndex, e)
                            }
                          />
                          <input
                            type="text"
                            name="link"
                            placeholder="Video Link"
                            required
                            className="flex-grow px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={video.link}
                            onChange={(e) =>
                              handleVideoChange(sectionIndex, videoIndex, e)
                            }
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeVideo(sectionIndex, videoIndex)
                            }
                            className="text-red-600 hover:text-red-800 transition-colors duration-150"
                          >
                            <XIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addVideo(sectionIndex)}
                        className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                      >
                        <PlusIcon className="h-4 w-4 mr-1" /> Add Video
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSection}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" /> Add Section
                  </button>
                </div>

                <button
                  className="w-full flex flex-row items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                  onClick={() => submitCourse()}
                >
                  {isSubmiting && (
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      color="#fff"
                    />
                  )}
                  <span>Create Course</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourseForm;
