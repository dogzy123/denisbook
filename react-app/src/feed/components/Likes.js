import React from "react";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import ThumbUp from "@material-ui/icons/ThumbUpTwoTone";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const LikedTooltip = withStyles( theme => ({
    tooltip: {
        backgroundColor: theme.denisbookPrimary,
        borderRadius : '2px',
        fontSize: '12px',
    }
}) )(Tooltip);

const useStyles = makeStyles( theme => ({
    likeIcon: {},
    liked: {
        color: theme.denisbookPrimary,

        '& > $likeIcon': {
            color: theme.denisbookPrimary,
        }
    }
}) );

const Likes = props => {
    const { handleLike, likesCount, liked, people } = props;
    const styles = useStyles();

    return (
        <span className={classNames('icon-like', (liked ? styles.liked : ''))}>
            <IconButton
                className={classNames('icon-like-btn', styles.likeIcon)}
                onClick={handleLike}
            >
                <ThumbUp fontSize="small"/>
            </IconButton>
            { likesCount > 0
                ? (
                    <LikedTooltip title={(
                        <div>
                            { people.map( person => <div>{person}</div> ) }
                        </div>
                    )}>
                        <div className='icon-like-container'>
                            <span className="icon-like-count">{likesCount}</span>
                        </div>
                    </LikedTooltip>
                )
                : (
                    <div className='icon-like-container'>
                        <span className="icon-like-count" />
                    </div>
                )
            }
        </span>
    );
};

export default Likes;