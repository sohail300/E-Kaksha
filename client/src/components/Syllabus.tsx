import AccordianComp from "./AccordianComp";

const Syllabus = () => {
  return (
    <>
      <h2 style={{ textAlign: "start", marginLeft: "16px" }}>Syllabus</h2>
      <div style={{ overflowY: "scroll", maxHeight: "75vh" }}>
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
      </div>
    </>
  );
};

export default Syllabus;
