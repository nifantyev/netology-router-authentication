import React from 'react';
import PropTypes from 'prop-types';

const NewsItem = ({ id, src, title, content, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div className="card mb-4">
      <img src={src} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5
          className={`card-title ${onClick ? 'clickable' : ''}`}
          onClick={handleClick}
        >
          {title}
        </h5>
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default NewsItem;
