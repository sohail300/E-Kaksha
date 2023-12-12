import Skeleton from "@mui/material/Skeleton";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="frame">
	<div className="container">
		<div className="box-4">
			<div className="loader-4">
				<div className="dbl-spin-1"></div>
				<div className="dbl-spin-2"></div>
			</div>
		</div>
	</div>
</div>
  );
};

export default Loader;
