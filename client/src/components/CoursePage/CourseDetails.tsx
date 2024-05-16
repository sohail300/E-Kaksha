import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DownloadIcon from "@mui/icons-material/Download";
import LanguageIcon from "@mui/icons-material/Language";
import CardMembershipIcon from "@mui/icons-material/CardMembership";

const CourseDetails = (props) => {
  return (
    <div>
      <h3 className="text-left px-4 py-2">This course includes:</h3>
      <div className="flex flex-col justify-start ml-4">
        <div className="flex items-center mb-4">
          <AccessTimeIcon className="mr-2" />
          <span>{props.duration} hour course</span>
        </div>
        <div className="flex items-center mb-4">
          <DownloadIcon className="mr-2" />
          <span>{props.resources} resources for download</span>
        </div>
        <div className="flex items-center mb-4">
          <LanguageIcon className="mr-2" />
          <span>Access via mobile devices and TV</span>
        </div>
        <div className="flex items-center mb-4">
          <CardMembershipIcon className="mr-2" />
          <span>Certificate of completion</span>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
