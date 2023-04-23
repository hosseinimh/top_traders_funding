import React, { useEffect } from "react";

function Accordion({ items }) {
    const expand = (btnElement, collapseElement) => {
        btnElement.classList.remove("collapsed");
        btnElement.setAttribute("aria-expanded", "true");
        collapseElement.classList.remove("collapse");
        collapseElement.classList.add("collapsing");
        setTimeout(() => {
            collapseElement.style = `height: ${collapseElement.childNodes[0].scrollHeight}px;`;
        }, 10);
        setTimeout(() => {
            collapseElement.classList.remove("collapsing");
            collapseElement.classList.add("collapse");
            collapseElement.classList.add("show");
        }, 300);
    };

    const collapse = (btnElement, collapseElement) => {
        btnElement.classList.add("collapsed");
        btnElement.setAttribute("aria-expanded", "false");
        collapseElement.classList.remove("show");
        collapseElement.classList.remove("collapse");
        collapseElement.classList.add("collapsing");
        setTimeout(() => {
            collapseElement.style = "height:0";
        }, 10);
        setTimeout(() => {
            collapseElement.classList.remove("collapsing");
            collapseElement.classList.add("collapse");
        }, 300);
    };

    useEffect(() => {
        if (items?.length > 0) {
            [...document.querySelectorAll("[data-toggle='collapse']")].map(
                (button) => {
                    button.addEventListener("click", (e) => {
                        const btnElement =
                            e.target.tagName === "H5"
                                ? e.target.parentNode
                                : e.target;
                        const collapseElement =
                            btnElement.parentNode.nextSibling;
                        if (btnElement.classList.contains("collapsed")) {
                            expand(btnElement, collapseElement);
                        } else {
                            collapse(btnElement, collapseElement);
                        }
                    });
                }
            );
        }
    }, [items]);

    if (!items || items?.length === 0) {
        return <></>;
    }

    return (
        <div id="accordion" className="accordion-wrapper mb-3">
            {items?.map((item, index) => (
                <div className="card" key={index + 1}>
                    <div id={`heading${index + 1}`} className="card-header">
                        <button
                            type="button"
                            data-toggle="collapse"
                            data-target={`#collapse${index + 1}`}
                            aria-expanded="false"
                            aria-controls={`collapse${index + 1}`}
                            className="text-justify m-0 p-0 btn btn-link btn-block collapsed"
                        >
                            <h5 className="m-0 p-0">{item.title}</h5>
                        </button>
                    </div>
                    <div
                        data-parent="#accordion"
                        id={`collapse${index + 1}`}
                        aria-labelledby={`heading${index + 1}`}
                        className="collapse"
                    >
                        <div className="card-body pb-2">
                            {item.body.split("\n").map(function (item, index) {
                                return (
                                    <React.Fragment key={index}>
                                        {item}
                                        <br />
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Accordion;
