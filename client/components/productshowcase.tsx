"use client";
import React, { useReducer } from "react";
import Featured from "./featured";
import Bestseller from "./bestseller";
import Arrival from "./arrival";

type ViewType = "Arrival" | "Bestseller" | "Feature";

type ActionType = { type: ViewType };

const Productshowcase = () => {
  function reducer(state: ViewType, action: ActionType): ViewType {
    return action.type;
  }
  const [currentview, dispatch] = useReducer(reducer, "Arrival");
  const renderComponent = () => {
    switch (currentview) {
      case "Arrival":
        return <Arrival />;
      case "Bestseller":
        return <Bestseller />;
      case "Feature":
        return <Featured />;
      default:
        return null;
    }
  };

  return (
    <div className="md:px-40 px-4 md:pb-12">
      <div className="flex justify-around md:justify-start md:gap-8">
        <button
          onClick={() => dispatch({ type: "Arrival" })}
          className={`hover:cursor-pointer text-nowrap ${
            currentview === "Arrival"
              ? "font-medium md:text-lg leading-8 border-b-2 border-black"
              : "font-medium md:text-lg leading-8 opacity-60"
          }`}
        >
          New Arrival
        </button>
        <button
          onClick={() => dispatch({ type: "Bestseller" })}
          className={`hover:cursor-pointer text-nowrap ${
            currentview === "Bestseller"
              ? "font-medium md:text-lg leading-8 border-b-2 border-black"
              : "font-medium md:text-lg leading-8 opacity-60"
          }`}
        >
          Bestseller
        </button>
        <button
          onClick={() => dispatch({ type: "Feature" })}
          className={`hover:cursor-pointer text-nowrap ${
            currentview === "Feature"
              ? "font-medium md:text-lg leading-8 border-b-2 border-black"
              : "font-medium md:text-lg leading-8 opacity-60"
          }`}
        >
          Featured Products
        </button>
      </div>
      <div className="py-6">{renderComponent()}</div>
    </div>
  );
};

export default Productshowcase;
