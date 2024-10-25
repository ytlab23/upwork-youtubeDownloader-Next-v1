import React from "react";

export default function ({ data }) {
  return (
    <div>
      {data.map((item, index) => (
        <div className="mt-8 text-center" key={index}>
          {item.title}
          {item.desc}
        </div>
      ))}
    </div>
  );
}
