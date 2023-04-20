import React from "react";

import FallbackError from "./FallbackError";
import { Error as HttpError } from "../../../http/entities";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        const errorObj = new HttpError();
        errorObj.store(
            error.stack.toString(),
            errorInfo.componentStack.toString()
        );
    }

    render() {
        if (this.state.hasError) {
            return <FallbackError />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
