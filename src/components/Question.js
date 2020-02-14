import React from 'react';

import ReactAudioPlayer from 'react-audio-player';
import { birdsData, questions } from './Dates/data';
import birdImage from './Dates/bird.png';

const Question = (props) => {
    const { isGuessed, activeQuestionIndex } = props;

    const birdIndex = questions[activeQuestionIndex];
    const bird = birdsData[activeQuestionIndex][birdIndex];

    return (
        <div className="block_two">
            <div className="block_item">
                <img className='question-img' src={isGuessed ? bird.image : birdImage}></img>
            </div>
            <div className="block_item_two">
                <h1>{isGuessed ? bird.name : '******'}</h1>
                <ReactAudioPlayer className="audio" src={bird.audio} controls />
            </div>
        </div>
    );
};

export default Question;
