import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';

function Cards ({ title="", priceRange="", details="", imgSrc=""}) {
    return (
        <Card border="danger" style={{ width: '18rem' }}>
            <Card.Header>Header</Card.Header>
            <Card.Body>
                <Card.Title>Danger Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Cards;