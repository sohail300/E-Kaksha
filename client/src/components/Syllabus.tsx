import AccordianComp from "./AccordianComp";
import syllabus from '../utils/syllabusArray'

const Syllabus = () => {
  return (
    <>
      <h2 style={{ textAlign: "start", marginLeft: "16px" }}>Syllabus</h2>
      <div style={{ overflowY: "scroll", maxHeight: "75vh" }}>
        {
          syllabus.map(obj => {
            return(
              <AccordianComp title={obj.title} contentArray={obj.content}/>
              )
            })
          }   
          </div>
    </>
  );
};

export default Syllabus;