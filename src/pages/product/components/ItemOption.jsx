export default function ItemOption ({ icon, description }) {

    return (
        <div className="item_option">
            <div className="icon_container"><img src={icon} alt="" /></div>

            <p className="description">{description}</p>
        </div>
    )
}