import syllabus from "../../utils/syllabusArray";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

const Syllabus = () => {
  return (
    <>
      <h2 className="text-left text-2xl font-medium ml-4">Syllabus</h2>

      <div className="overflow-y-scroll ">
        {syllabus.map((obj) => (
          <Accordion sx={{ margin: "16px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{obj.title}</Typography>
            </AccordionSummary>
            <AccordionDetails className=" text-blue-500 flex flex-col items-start">
              {obj.content.map((item) => {
                return (
                  <Typography
                    sx={{ marginBottom: "8px" }}
                    className="cursor-pointer"
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
