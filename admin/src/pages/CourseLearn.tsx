import { useState, useEffect } from "react";
import { api } from "../utils/config";
import { useParams } from "react-router-dom";
import { BookOpen, Video, ChevronDown, ChevronUp, Loader } from "lucide-react";
import {
  BigPlayButton,
  ControlBar,
  LoadingSpinner,
  PlaybackRateMenuButton,
  Player,
} from "video-react";

const Courselearn = () => {
  interface Course {
    title: string;
    description: string;
    price: number;
    imagelink: string;
    duration: number;
    resource: number;
    sections: {
      title: string;
      resources: string;
      videos: {
        name: string;
        link: string;
      }[];
    }[];
  }

  const [course, setCourse] = useState<Course>({
    title: "",
    description: "",
    price: 0,
    imagelink: "",
    duration: 0,
    resource: 0,
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
  const [activeSection, setActiveSection] = useState(0);
  const [activeVideo, setActiveVideo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/course/id/${id}`, {
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        });
        console.log(response.data.course.sections[0].videos[0].link);
        setActiveVideo(response.data.course.sections[0].videos[0].link);
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-4">
        <div className="flex flex-grow flex-col lg:flex-row p-6 gap-8 max-w-7xl mx-auto w-full">
          {/* Fixed left section (Video player and course info) */}
          <div className="lg:w-2/3 p-6 space-y-6 lg:overflow-y-auto lg:h-screen lg:sticky lg:top-0">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className=" bg-black rounded-xl shadow-2xl overflow-hidden">
                <Player
                  src={activeVideo}
                  fluid={false}
                  width={760}
                  height={420}
                >
                  <BigPlayButton position="center" />
                  <ControlBar>
                    <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
                  </ControlBar>
                  <LoadingSpinner />
                </Player>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-left">
                  {course.title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed text-left">
                  {course.description}
                </p>
                <div className="mt-6 flex items-center text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Video size={20} className="mr-2" />
                    <span>{course.duration} hours</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen size={20} className="mr-2" />
                    <span>{course.resource} resources</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable right section (Course content) */}
          <div className="lg:w-1/3 p-6 lg:overflow-y-auto lg:h-screen">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Course Content
              </h3>
              {course.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-4">
                  <button
                    className="flex justify-between items-center w-full p-4 bg-gray-100 rounded-lg focus:outline-none transition-colors duration-200 hover:bg-gray-200"
                    onClick={() =>
                      setActiveSection(
                        activeSection === sectionIndex ? -1 : sectionIndex
                      )
                    }
                  >
                    <span className="font-medium text-gray-800">
                      {section.title}
                    </span>
                    {activeSection === sectionIndex ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  {activeSection === sectionIndex && (
                    <div className="mt-2 space-y-2 pl-4">
                      {section.videos.map((video, videoIndex) => (
                        <button
                          key={videoIndex}
                          className="flex items-center w-full p-3 rounded-lg focus:outline-none transition-colors duration-200 hover:bg-gray-100"
                          onClick={() => setActiveVideo(video.link)}
                        >
                          <div className="flex-shrink-0 mr-3">
                            <Video size={20} className="text-gray-400" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-700">
                              {video.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Video {videoIndex + 1}
                            </p>
                          </div>
                        </button>
                      ))}
                      {section.resources && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg text-left">
                          <h4 className="font-semibold text-blue-800 mb-2">
                            Resources:
                          </h4>
                          <p className="text-blue-600">{section.resources}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courselearn;
