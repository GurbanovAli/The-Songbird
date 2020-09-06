import React, { Component } from 'react';
import Question from './Question';
import { birdsData, questions } from './Dates/data';

import logo from './img/logo.svg';
import AnswersList from './AnswersList';
import Score from './Score';
import Congratulation from './Congratulation';

const headerList = [
    {
        name: 'Разминка'
    },
    {
        name: 'Воробьиные'
    },
    {
        name: 'Лесные птицы'
    },
    {
        name: 'Певчие птицы'
    },
    {
        name: 'Хищные птицы'
    },
    {
        name: 'Морские птицы'
    }
];

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeQuestionIndex: 0,
            lastClickedIndex: -1,
            isGuessed: false,
            score: 0,
            chosen: []
        };
    }

    playSound = (isCorrect) => {
        const url = 'http://freesoundeffect.net/sites/default/files/bonus-collect-1-sound-effect-82748414.mp3';
        const win = new Audio(url);
        const soundOver = 'http://freesoundeffect.net/sites/default/files/wrong-answer-game-over-6-sound-effect-87570191.mp3';
        const over = new Audio(soundOver);
        if (isCorrect) {
            win.play();
        } else {
            over.play();
        }
    };

    guess = (id) => {
        this.setState(({ activeQuestionIndex, isGuessed, chosen, score }) => {
            const correctAnswerId = questions[activeQuestionIndex];
            const isCorrect = id === correctAnswerId;
            const isFirstGuess = !chosen.length;
            let newScore = score;

            if (isCorrect && isFirstGuess) {
                newScore += 5;
            }

            if (isCorrect && !isFirstGuess) {
                newScore += 1;
            }

            if (!isGuessed && !chosen.includes(id)) {
                chosen.push(id);
                this.playSound(isCorrect);
            }

            return {
                lastClickedIndex: id,
                isGuessed: isGuessed || isCorrect,
                chosen,
                score: newScore
            };
        });
    };

    changeQuestion = () => {
        const maxCount = birdsData.length - 1;

        const { activeQuestionIndex } = this.state;
        if (activeQuestionIndex >= maxCount) {
            return;
        }

        this.setState((state) => ({
            activeQuestionIndex: state.activeQuestionIndex + 1,
            lastClickedIndex: -1,
            isGuessed: false,
            chosen: []
        }));
    };


    render() {
        const { activeQuestionIndex, isGuessed, chosen, lastClickedIndex, score } = this.state;

        return (
           <>
             {this.state.activeQuestionIndex < 6  ?
                <div>
                <div className="block_one">
                    <header>
                        <img className="logo" src={logo} />
                        <Score count={score} />
                    </header>
                    <ul className="ul_item">
                        {headerList.map((newList, index) => (
                            <li
                                key={newList.name}
                                className={`list_item ${index === activeQuestionIndex ? 'active' : ''}`}
                                style={newList.style}> {newList.name} </li>
                        ))}
                    </ul>
                </div>
                   <Question
                      isGuessed={isGuessed}
                      activeQuestionIndex={activeQuestionIndex}
                   />
                   <AnswersList
                      isGuessed={isGuessed}
                      chosen={chosen}
                      lastClickedIndex={lastClickedIndex}
                      activeQuestionIndex={activeQuestionIndex}
                      guess={this.guess}
                   />
                 <button onClick={this.changeQuestion} disabled={!isGuessed}>Next Level</button>
              </div>
              : <Congratulation score={score}/>
            }
            </>
        );
    }
}
