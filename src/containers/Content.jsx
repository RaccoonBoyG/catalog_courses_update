import React from 'react';

export const ObjectContent = props => {
  return props.data_content.map((item, key) => {
    return item.type_slug !== 'hide' ? (
      <div className="text-custom-dark2 mb-3 p-5 shadow-sm bg-white" key={key} dangerouslySetInnerHTML={{ __html: item.content }}></div>
    ) : null;
  });
};

export const ArrayContent = props => {
  return props.data_content.map(item => {
    item.content.map((i, key) => {
      return <div className="text-custom-dark2 mt-3 p-5 shadow-sm bg-white" key={key} dangerouslySetInnerHTML={{ __html: i.content }}></div>;
    });
  });
};
