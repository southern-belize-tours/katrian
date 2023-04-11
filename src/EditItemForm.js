import * as React from 'react';

import SaveAsIcon from '@mui/icons-material/SaveAs';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


class EditItemForm extends React.Component {
    constructor(props) {
        super();

        const modelCopy = { ...props.model };
        this.state = {
            model: modelCopy
        };
    }

    render() {
        return(
            <form onSubmit={() => {this.props.submitFunction(this.state.model)}}>
            <div className="formLine">
                <TextField required id="name" label="Item Name" variant="standard"
                    value={this.state.model.itemName}
                    onChange={(event) => {
                        const newValue = event.target.value;
                        this.setState(prevState => ({
                          model: {
                            ...prevState.model,
                            itemName: newValue
                          }
                        }));
                      }}/>
                <TextField id="imageUrl" label="Item Image URL" variant="standard"
                    onChange={(event) => {
                        const newValue = event.target.value;
                        this.setState(prevState => ({
                          model: {
                            ...prevState.model,
                            itemImageUrl: newValue
                          }
                        }));
                      }}
                    value={this.state.model.itemImageUrl}
                    InputProps={{
                        pattern: "^(http|https)://.*$",
                        title: "Please enter a valid URL starting with http or https",
                      }}/>
                <TextField required id="price" type="number"
                    value={this.state.model.itemPrice}
                    onChange={(event) => {
                        const newValue = parseFloat(event.target.value);
                        this.setState(prevState => ({
                          model: {
                            ...prevState.model,
                            itemPrice: newValue
                          }
                        }));
                      }}
                    InputProps={{
                      inputProps: {
                        step: "0.01",
                        min: "0"
                      }
                    }}
                    label="Item Price" variant="standard" />
                <TextField required id="quantity" label="Quantity" variant="standard"
                    defaultValue="1"
                    value={this.state.model.itemQuantity}
                    onChange={(event) => {
                    const newValue = parseInt(event.target.value);
                        this.setState(prevState => ({
                          model: {
                            ...prevState.model,
                            itemQuantity: newValue
                          }
                        }));
                      }}
                    type="number"
                    InputProps={{
                      inputProps: {
                        step: "1",
                        min: "1"
                      }
                    }}/>
                <TextField required id="link" label="URL" variant="standard"
                    value={this.state.model.itemLink}
                    onChange={(event) => {
                        const newValue = event.target.value;
                        this.setState(prevState => ({
                          model: {
                            ...prevState.model,
                            itemLink: newValue
                          }
                        }));
                      }}
                    InputProps={{
                        pattern: "^(http|https)://.*$",
                        title: "Please enter a valid URL starting with http or https",
                      }}/>
                {/* <TextField id="guestName" label="Guest Name" variant="standard" /> */}
                <Button variant="contained" type="submit">
                    <SaveAsIcon></SaveAsIcon> Save Item
                </Button>
                <Button variant="contained"
                    onClick={() => {this.props.cancelCallback()}}>
                    <CancelIcon></CancelIcon> Cancel Edits
                </Button>
            </div>
        </form>
        )
    }
} export default EditItemForm;