import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DownloadIcon from "@mui/icons-material/Download";
import LanguageIcon from "@mui/icons-material/Language";
import CardMembershipIcon from "@mui/icons-material/CardMembership";

const CourseDetails = (props) => {
    return (
        <div>
          <h3 style={{ textAlign: "left", margin: "4px 12px" }}>
            This course includes:
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: "12px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AccessTimeIcon style={{ marginRight: "8px", marginBottom: "8px" }} />
              {props.duration} hour course
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <DownloadIcon style={{ marginRight: "8px", marginBottom: "8px" }} />
              {props.resources} resources for download
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LanguageIcon style={{ marginRight: "8px", marginBottom: "8px" }} />
              Access via mobile devices and TV
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CardMembershipIcon
                style={{ marginRight: "8px", marginBottom: "8px" }}
              />
              Certificate of completion
            </div>
          </div>
        </div>
      );
}

export default CourseDetails