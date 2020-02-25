import {useDispatch} from "react-redux";
import React, {useState, useEffect} from 'react';
import {post} from "../../requests";
import {addPost} from "../../actions/actions";
import Modal from '@material-ui/core/Modal';
import Icon from "@material-ui/core/Icon";
import {makeStyles} from "@material-ui/core";
import classNames from "classnames";

const getImageModalStyles = () => {
    return {
        position : 'absolute',
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
};

const getImageStyles = () => {
    return {
        maxHeight : '575px',
        maxWidth  : '100%'
    };
};

const checkMobileDevice = () => {
    // regex from http://detectmobilebrowsers.com/
    let check = false;

    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(window.navigator.userAgent||window.navigator.vendor||window.opera);

    return check;
}

const useStyles = makeStyles(theme => ({
    createPost: {
        backgroundColor: theme.denisbookLight,
        border: '1px solid',
        borderColor: theme.denisbookBorder,

        '&::-webkit-input-placeholder': {
            color: theme.denisbookPrimary,
        },
        '&:-ms-input-placeholder': {
            color: theme.denisbookPrimary,
        },
        '&::placeholder': {
            color: theme.denisbookPrimary,
        },
    },
    createPostIcon: {
        color: theme.denisbookPrimary,
    }
}) );

const AddPosts = () => {
    const dispatch = useDispatch();
    const styles = useStyles();
    const [text, setText] = useState('');
    const [pastedImages, setPastedImages] = useState([]);
    const [isError, setIsError] = useState(false);
    const [fullImage, setFullImage] = useState('');
    const [lines, setLines] = useState({13: false, 16: false});

    const afterSend = () => {
        setPastedImages([]);
        setText('');
    };

    const handleFullImage = any => {
        setFullImage(any);
    };

    const removePreviewImage = index => {
        const images = [].concat(pastedImages);

        images.splice(index, 1);

        setPastedImages( images );
    }

    const sendPost = () => {
        const data = {
            text,
            customData: {
                fromMobile: checkMobileDevice(),
            }
        };

        if (pastedImages.length > 0)
        {
            pastedImages.forEach( img => {
                data.text = data.text + `![](${img})\n`;
            } );
        }

        post({func: "addPost", componentDispatch: dispatch, ...data})
            .then( response => {
                const newPost = {
                    rowId   : response['rowId'],
                    author  : response['author'],
                    ...data
                };

                dispatch( addPost( newPost ) );
            } );

        afterSend();
    };

    const sendMsg = () => {
        if (text && text.length > 0)
        {
            sendPost();
        }
    }

    const handleInput = value => {
        setText(value);
    }

    const onPaste = e => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;

        for (let index in items)
        {
            let item = items[index];

            if (item.kind === 'file')
            {
                const blob      = item.getAsFile();
                const reader    = new FileReader();

                reader.onload = event => {
                    const imgBase64 = event.target.result;

                    post({
                        func: "uploadImage",
                        fileName : blob.name,
                        imageBase64: imgBase64.substring(imgBase64.indexOf("base64,") + 7, imgBase64.length)
                    })
                        .then( response => {
                            if (response && response['message'] === "ok")
                            {
                                setPastedImages( prev => prev.concat([response['imageUrl']]));
                            }
                        } );
                };

                reader.readAsDataURL(blob)
            }
        }
    }

    const handleKeyDown = e => {
        if (e.keyCode === 16 || e.keyCode === 13)
        {
            setLines({
                ...lines,
                [e.keyCode]: true,
            });

            if (e.keyCode === 13 && !lines['16'])
            {
                e.preventDefault();

                if (e.target.value.length < 1 && pastedImages.length < 1)
                {
                    return setIsError(true);
                }

                return sendPost();
            }
        }
    };

    const handleKeyUp = e => {
        if (e.keyCode === 13 || e.keyCode === 16)
        {
            setLines({
                ...lines,
                [e.keyCode]: false,
            });
        }
    };

    useEffect( () => {
        setIsError(text.length < 1);
    }, [text] );

    return (
        <div className="create-post">
            <div className="create-post-wrapper">
                <textarea
                    value={text}
                    onPaste={onPaste}
                    className={classNames("create-post-text", styles.createPost, (isError ? " error" : ""))}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    onChange={ e => handleInput(e.target.value)} placeholder="Type a message..."
                />
                <Icon
                    className={classNames("create-post-send", styles.createPostIcon)}
                    onClick={ () => sendMsg() }
                >send</Icon>
            </div>
            {
                pastedImages.length > 0
                    ? (
                        <div className="create-post-image-preview">
                            {
                                pastedImages.map( (imageUrl, i) => {
                                    return (
                                        <div className="preview-image-wrapper" key={i}>
                                            <span className="preview-image-remove" onClick={ () => removePreviewImage(i) }>
                                                <svg className="close-svg" viewBox="0 0 40 40">
                                                    <path className="close-svg-path" d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                                </svg>
                                            </span>
                                            <img src={imageUrl} alt={"preview" + i} onClick={ () => handleFullImage(imageUrl) }/>
                                        </div>
                                    );
                                } )
                            }
                            <Modal
                                open={fullImage.length > 0}
                                onClose={ () => handleFullImage(false) }
                            >
                                <div style={getImageModalStyles()}>
                                    <div>
                                        <img alt='img' src={fullImage} style={getImageStyles()}/>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    )
                    : null
            }
        </div>
    );
};

export default AddPosts;
