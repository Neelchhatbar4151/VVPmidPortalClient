import vvp from "../assets/images/vvp.png";
const Title = () => {
    return (
        <div>
            <div className="nameCover">
                <img
                    id="logo"
                    src={vvp}
                    alt="vvp logo"
                    height={70}
                    width={65}
                />
                <div className="titleText">V.V.P. ENGINEERING COLLEGE</div>
            </div>
            <div className="department">
                Department Of Information Technology
            </div>
            <br />
            <hr />
        </div>
    );
};

export default Title;
