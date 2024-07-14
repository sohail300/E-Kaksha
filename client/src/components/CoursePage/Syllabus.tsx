import syllabus from "../../utils/syllabusArray";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

const Syllabus = () => {
  return (
    <>
      <h2 className="text-left text-2xl font-medium ml-4 md:text-3xl md:ml-8">
        Syllabus
      </h2>

      <div className="overflow-y-scroll max-h-screen md:max-h-[75vh] p-4 md:p-8">
        {syllabus.map((obj, index) => (
          <Accordion key={index} sx={{ margin: "16px 0", width: "100%" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="text-base md:text-lg">
                {obj.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="text-blue-500 flex flex-col items-start">
              {obj.content.map((item, idx) => {
                return (
                  <Typography
                    key={idx}
                    sx={{ marginBottom: "8px" }}
                    className="cursor-pointer text-sm md:text-base"
                  >
                    {item}
                  </Typography>
                );
              })}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default Syllabus;
