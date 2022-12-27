import React from "react";
import { useParams } from "react-router-dom";
const ProductScreen = () => {
  const params = useParams();

  const { pcTowers } = params;

  const towers = Object.values(pcTowers);

  console.log(towers);
  return (
    <div>
      {towers.map((name) => (
        <h1>{name}</h1>
      ))}
    </div>
  );
};

export default ProductScreen;
