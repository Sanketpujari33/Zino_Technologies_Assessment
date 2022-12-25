import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const CardStack = () => {
    // State to store the cards in each stack
    const [redCards, setRedCards] = useState([]);
    const [blueCards, setBlueCards] = useState([]);
    const [greenCards, setGreenCards] = useState([]);
    const [blackCards, setBlackCards] = useState([]);

    // Function to add a new card to the specified stack
    const addCard = stack => {
        switch (stack) {
            case 'red':
                if (redCards.length < 8) {
                    setRedCards([...redCards, { text: 'New Card', editing: false }]);
                }
                break;
            case 'blue':
                if (blueCards.length < 8) {
                    setBlueCards([...blueCards, { text: 'New Card', editing: false }]);
                }
                break;
            case 'green':
                if (greenCards.length < 8) {
                    setGreenCards([...greenCards, { text: 'New Card', editing: false }]);
                }
                break;
            case 'black':
                if (blackCards.length < 8) {
                    setBlackCards([...blackCards, { text: 'New Card', editing: false }]);
                }
                break;
            default:
                break;
        }
    };


    // Function to delete a card from the specified stack
    const deleteCard = (stack, index) => {
        switch (stack) {
            case 'red':
                setRedCards(redCards.filter((_, i) => i !== index));
                break;
            case 'blue':
                setBlueCards(blueCards.filter((_, i) => i !== index));
                break;
            case 'green':
                setGreenCards(greenCards.filter((_, i) => i !== index));
                break;
            case 'black':
                setBlackCards(blackCards.filter((_, i) => i !== index));
                break;
            default:
                break;
        }
    };
    const handleCardClick = (stack, index) => {
        switch (stack) {
            case 'red':
                const redCard = { ...redCards[index] };
                redCard.editing = !redCard.editing;
                setRedCards([...redCards.slice(0, index), redCard, ...redCards.slice(index + 1)]);
                break;
            case 'blue':
                const blueCard = { ...blueCards[index] };
                blueCard.editing = !blueCard.editing;
                setBlueCards([...blueCards.slice(0, index), blueCard, ...blueCards.slice(index + 1)]);
                break;
            case 'green':
                const greenCard = { ...greenCards[index] };
                greenCard.editing = !greenCard.editing;
                setGreenCards([...greenCards.slice(0, index), greenCard, ...greenCards.slice(index + 1)]);
                break;
            case 'black':
                const blackCard = { ...blackCards[index] };
                blackCard.editing = !blackCard.editing;
                setBlackCards([...blackCards.slice(0, index), blackCard, ...blackCards.slice(index + 1)]);
                break;
            default:
                break;
        }
    };
    const handleChange = (stack, index, value) => {
        switch (stack) {
            case 'red':
                const redCard = { ...redCards[index] };
                redCard.text = value;
                setRedCards([...redCards.slice(0, index), redCard, ...redCards.slice(index + 1)]);
                break;
            case 'blue':
                const blueCard = { ...blueCards[index] };
                blueCard.text = value;
                setBlueCards([...blueCards.slice(0, index), blueCard, ...blueCards.slice(index + 1)]);
                break;
            case 'green':
                const greenCard = { ...greenCards[index] };
                greenCard.text = value;
                setGreenCards([...greenCards.slice(0, index), greenCard, ...greenCards.slice(index + 1)]);
                break;
            case 'black':
                const blackCard = { ...blackCards[index] };
                blackCard.text = value;
                setBlackCards([...blackCards.slice(0, index), blackCard, ...blackCards.slice(index + 1)]);
                break;
            default:
                break;
        }
    };

    // Function to handle saving the edited text of a card
    const handleSave = (stack, index, value) => {
        switch (stack) {
            case 'red':
                const redCard = { ...redCards[index] };
                redCard.text = value;
                redCard.editing = false;
                setRedCards([...redCards.slice(0, index), redCard, ...redCards.slice(index + 1)]);
                break;
            case 'blue':
                const blueCard = { ...blueCards[index] };
                blueCard.text = value;
                blueCard.editing = false;
                setBlueCards([...blueCards.slice(0, index), blueCard, ...blueCards.slice(index + 1)]);
                break;
            case 'green':
                const greenCard = { ...greenCards[index] };
                greenCard.text = value;
                greenCard.editing = false;
                setGreenCards([...greenCards.slice(0, index), greenCard, ...greenCards.slice(index + 1)]);
                break;
            case 'black':
                const blackCard = { ...blackCards[index] };
                blackCard.text = value;
                blackCard.editing = false;
                setBlackCards([...blackCards.slice(0, index), blackCard, ...blackCards.slice(index + 1)]);
                break;
            default:
                break;
        }
    };

    const onCardDragStart = (ev, stack, index) => {
        const card = getCard(stack, index);
        ev.dataTransfer.setData('card', JSON.stringify({ stack, index, card }));
    };

    const onCardDrop = (ev, stack) => {
        const cardData = JSON.parse(ev.dataTransfer.getData('card'));
        deleteCard(cardData.stack, cardData.index);
        switch (stack) {
            case 'red':
                if (redCards.length < 8) {
                    setRedCards([...redCards, cardData.card]);
                }
                break;
            case 'blue':
                if (blackCards.length < 8) {
                    setBlueCards([...blueCards, cardData.card]);
                }
                break;
            case 'green':
                if (greenCards.length < 8) {
                    setGreenCards([...greenCards, cardData.card]);
                }
                break;
            case 'black':
                if (blackCards.length < 8) {
                    setBlackCards([...blackCards, cardData.card]);
                }
                break;
            default:
                break;
        }
    };
    const getCard = (stack, index) => {
        switch (stack) {
            case 'red':
                return redCards[index];
            case 'blue':
                return blueCards[index];
            case 'green':
                return greenCards[index];
            case 'black':
                return blackCards[index];
            default:
                return null;
        }
    };

    // Function to handle the dragover event
    const onCardDragOver = ev => {
        ev.preventDefault();
    };
    return (
        <div className="card-stack" style={{ padding: '50px', margin: '50px' }}>
            <Row>
                <Col>
                    {/* Red stack */}
                    <div className="stack red-stack" onDrop={ev => onCardDrop(ev, 'red')} onDragOver={onCardDragOver}>
                        <label for="" style={{ backgroundColor: '#ff000052', padding: '10px' }}>Red</label>
                        <Button variant="success" className='ms-1 my-3' onClick={() => addCard('red')}>
                            Add Card
                        </Button>
                        {redCards.map((card, index) => (
                            <Card key={index} style={{ backgroundColor: '#ff000052', margin: '20px' }} draggable onDragStart={ev => onCardDragStart(ev, 'red', index)}>
                                {card.editing ? (
                                    <input
                                        type="text"
                                        value={card.text}
                                        onChange={(ev) => handleChange('red', index, ev.target.value)}
                                        onBlur={(ev) => handleSave('red', index, ev.target.value)}
                                        onKeyPress={(ev) => {
                                            if (ev.key === 'Enter') {
                                                handleSave('red', index, ev.target.value);
                                            }
                                        }}
                                    />
                                ) : (
                                    <Card.Text onClick={() => handleCardClick('red', index)}>{card.text}</Card.Text>
                                )}
                                <span variant="danger" style={{ fontSize: '23px',display: "flex", justifyContent: 'center', }}
                                    onClick={() => deleteCard('red', index)}>
                                    X
                                </span>
                            </Card>
                        ))}
                    </div>
                </Col>
                <Col>
                    {/* Blue stack */}
                    <div className="stack red-stack" onDrop={ev => onCardDrop(ev, 'blue')} onDragOver={onCardDragOver}>
                        <label for="" style={{ backgroundColor: '#0000ff94', padding: '10px' }}>Blue</label>
                        <Button variant="success" className='ms-2 my-3' onClick={() => addCard('blue')}>
                            Add Card
                        </Button>
                        {blueCards.map((card, index) => (
                            <Card key={index} style={{ backgroundColor: '#0000ff94', margin: '20px' }} draggable onDragStart={ev => onCardDragStart(ev, 'blue', index)}>
                                {card.editing ? (
                                    <input
                                        type="text"
                                        value={card.text}
                                        onChange={(ev) => handleChange('blue', index, ev.target.value)}
                                        onBlur={(ev) => handleSave('blue', index, ev.target.value)}
                                        onKeyPress={(ev) => {
                                            if (ev.key === 'Enter') {
                                                handleSave('blue', index, ev.target.value);
                                            }
                                        }}
                                    />
                                ) : (
                                    <Card.Text onClick={() => handleCardClick('blue', index)}>{card.text}</Card.Text>
                                )}
                                <span variant="danger" style={{ fontSize: '23px',display: "flex", justifyContent: 'center', }}
                                    onClick={() => deleteCard('blue', index)}>
                                    X
                                </span>
                            </Card>
                        ))}
                    </div>
                </Col>
                <Col>
                    {/* Green stack */}
                    <div className="stack red-stack" onDrop={ev => onCardDrop(ev, 'green')} onDragOver={onCardDragOver}>
                        <label for="" style={{ backgroundColor: '#48bf4878', padding: '10px' }}>Green</label>
                        <Button variant="success" className='ms-2 my-3' onClick={() => addCard('green')}>
                            Add Card
                        </Button>
                        {greenCards.map((card, index) => (
                            <Card key={index} style={{ backgroundColor: '#48bf4878', margin: '20px' }} draggable onDragStart={ev => onCardDragStart(ev, 'green', index)}>
                                {card.editing ? (
                                    <input
                                        type="text"
                                        value={card.text}
                                        onChange={(ev) => handleChange('green', index, ev.target.value)}
                                        onBlur={(ev) => handleSave('green', index, ev.target.value)}
                                        onKeyPress={(ev) => {
                                            if (ev.key === 'Enter') {
                                                handleSave('green', index, ev.target.value);
                                            }
                                        }}
                                    />
                                ) : (
                                    <Card.Text onClick={() => handleCardClick('green', index)}>{card.text}</Card.Text>
                                )}
                                <span variant="danger" style={{ fontSize: '23px',display: "flex", justifyContent: 'center', }}
                                    onClick={() => deleteCard('green', index)}>
                                    X
                                </span>
                            </Card>
                        ))}
                    </div>
                </Col>
                <Col>
                    {/* Black stack */}
                    <div className="stack red-stack" onDrop={ev => onCardDrop(ev, 'black')} onDragOver={onCardDragOver}>
                        <label for="" style={{ backgroundColor: '#00000080', padding: '10px' }}>Black</label>
                        <Button className='ms-2 my-3' variant="success" onClick={() => addCard('black')}>
                            Add Card
                        </Button>
                        {blackCards.map((card, index) => (
                            <Card key={index} style={{ backgroundColor: '#00000080', margin: '20px' }} draggable onDragStart={ev => onCardDragStart(ev, 'black', index)}>
                                {card.editing ? (
                                    <input
                                        type="text"
                                        value={card.text}
                                        onChange={(ev) => handleChange('black', index, ev.target.value)}
                                        onBlur={(ev) => handleSave('black', index, ev.target.value)}
                                        onKeyPress={(ev) => {
                                            if (ev.key === 'Enter') {
                                                handleSave('black', index, ev.target.value);
                                            }
                                        }}
                                    />
                                ) : (
                                    <Card.Text onClick={() => handleCardClick('black', index)}>{card.text}</Card.Text>
                                )}
                                <span variant="danger" style={{ fontSize: '23px',display: "flex", justifyContent: 'center', }}
                                    onClick={() => deleteCard('black', index)}>
                                    X
                                </span>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default CardStack;