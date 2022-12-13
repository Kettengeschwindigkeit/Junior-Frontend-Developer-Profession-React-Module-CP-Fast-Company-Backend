import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ favs, id, ...rest }) => {
    const status = favs.includes(id);

    return (
        <button {...rest}>
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    );
};
BookMark.propTypes = {
    favs: PropTypes.array,
    id: PropTypes.string
};

export default BookMark;
