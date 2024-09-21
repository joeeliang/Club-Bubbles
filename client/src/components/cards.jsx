import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

function Cards ({ title="", priceRange="", details="", imgSrc=""}) {
    const handleButtonPress = async () => {
        try {
            const response = await axios.post('http://localhost:8000/call_python_function');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card border="danger" style={{ width: '18rem' }}>
            <Card.Header>Header</Card.Header>
            <Card.Body>
                <Card.Title>Danger Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <button onClick={handleButtonPress}>Call Python function</button>
            </Card.Body>
        </Card>
    )
}

export default Cards;