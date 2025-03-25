import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import mySwaggerJson from "./swagger.json";

const SwaggerPage: React.FC = () => {
  return (

    <div style={{
      width: "100%", height: "100vh", padding: "20px"
    }}>
      <SwaggerUI spec={mySwaggerJson} />  {/* Load your API list */}
    </div>
  );
};
export default SwaggerPage;
