import './Registry.css';

export default function RegistryItem (props) {

    return (
    <div className="registryItemContainer" 
        style={{backgroundImage: `url(${props.photo})`}}>
        <div className="registryItemTitle">
            {props.title}
        </div>
        <div className="registryItemDescription">
            {props.description}
        </div>
        <div className="registryItemCost">
            {props.cost}
        </div>
    </div>
    );
}