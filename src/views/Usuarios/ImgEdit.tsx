import { Button } from "@material-ui/core";
import React, { Component } from "react";
import "./E.css";

export class App extends Component {




    
    state = {
        profileImg:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    };
    imageHandler = (e: any) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ profileImg: reader.result });
            }
        };
        reader.readAsDataURL(e.target.files[0]);
        
    };


    render() {
        const { profileImg } = this.state;

        var img = new Image();
        img.crossOrigin = 'Anonymous';

        img.onload = function () {
            var canvas = document.createElement('canvas'),


                ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.height = img.naturalHeight;
                canvas.width = img.naturalWidth;
                ctx.drawImage(img, 0, 0);

            }


            var uri = canvas.toDataURL('image/jpg'),
                b64 = uri.replace(/^data:image.+;base64,/, '');

            console.log(b64);
        };


        var url = profileImg;
        img.src = url;




        return (
            <div className="page">
                <div className="container">

                    <div className="img-holder">
                        <img src={profileImg} alt="" id="img" className="img" />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        name="image-upload"
                        id="input"
                        onChange={this.imageHandler}
                    />
                    <div className="label">


                        <label className="image-upload" htmlFor="input">
                            Agregar foto
                            </label>



                    </div>
                </div>
            </div>
        );
    }
}

export default App;
