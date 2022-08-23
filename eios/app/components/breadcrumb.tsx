import React from "react";
import {Link} from "react-router-dom";

interface BreadcrumbProps {
    links: BreadcrumbItemInterface[];
}

interface BreadcrumbItemInterface {
    link?: string;
    text: string;
    is_active?: boolean;
}

class Breadcrumb extends React.Component<BreadcrumbProps> {
    render() {
        const {links} = this.props;

        const list = links.map((item, indx) => {
            return item.is_active ?
                <li key={indx} className="breadcrumb-item active" aria-current="page">{item.text}</li> :
                <li className="breadcrumb-item" key={indx}><Link to={item.link}>{item.text}</Link></li>;
        });

        if (list.length) {
            return <nav aria-label="breadcrumb">
                <ol className="breadcrumb">{list}</ol>
            </nav>;
        }
        return '';
    }
}

export default Breadcrumb;