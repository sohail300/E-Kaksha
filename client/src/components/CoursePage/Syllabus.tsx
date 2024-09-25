import { ChevronDown } from "lucide-react";

const Syllabus = ({ syllabus }) => {
  return (
    <>
      <h2 className="text-left text-2xl font-medium ml-4 md:text-3xl md:ml-8 mb-4">
        Course Syllabus
      </h2>

      <div className="space-y-4 max-w-5xl mx-auto">
        {syllabus.map((obj, index) => (
          <details
            key={index}
            className="group bg-white rounded-lg shadow-sm border-gray-300 border hover:shadow-md transition-shadow duration-300"
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer list-none">
              <h3 className="text-lg font-semibold text-gray-800">
                {obj.title}
              </h3>
              <ChevronDown className="w-5 h-5 text-indigo-600 transform group-open:rotate-180 transition-transform duration-300" />
            </summary>
            <div className="p-4 bg-indigo-50 rounded-b-lg">
              <ul className="space-y-2">
                {obj.videos.map((video, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span className="text-indigo-700 hover:text-indigo-900 cursor-pointer transition-colors duration-200">
                      {video.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </>
  );
};

export default Syllabus;
