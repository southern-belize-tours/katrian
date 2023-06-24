import * as React from 'react';
import gift from './images/gift.jpg'

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import AbcIcon from '@mui/icons-material/Abc';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from "@mui/material";

import { DataStore } from '@aws-amplify/datastore';
import { Item } from './models';

import EditItemForm from './EditItemForm.js';

class Registry extends React.Component {

    constructor(props) {
        super();

        this.state = {
            models: []
        };

        this.updateModel = this.updateModel.bind(this);
        this.cancelUpdateExisting = this.cancelUpdateExisting.bind(this);
    }

    async refresh() {
        const models = await DataStore.query(Item);
        this.setState({
            models: models
        });
    }

    async componentDidMount() {
        const models = await DataStore.query(Item);
        this.setState({
            models
        });
    }

    async deleteItem(modelId) {
        // try {
        //     const modelToDelete = await DataStore.query(Item, 123456789);
        //     DataStore.delete(modelToDelete);
        // } catch (error) {
        //     console.log("Error deleting item:", error);
        // }
        const modelToDelete = await DataStore.query(Item, modelId);
        await DataStore.delete(modelToDelete);
        const updatedModels = this.state.models.filter((model) => model.id !== modelId);
        this.setState({ models: updatedModels });
    }

    async deleteAll() {
        const { models } = this.state;
        for (let i = 0; i < models.length; i++) {
          const modelToDelete = await DataStore.query(Item, models[i].id);
          await DataStore.delete(modelToDelete);
        }
        this.setState({ models: [],
            addingNew: false,
            updatingExisting: false,
            updatingModel: null});
    }

    async updateModel(model) {
      console.log(model);
      try {
        await DataStore.save(
            new Item({
                itemName: model.itemName,
                itemImageUrl: model.itemImageUrl,
                itemPrice: model.itemPrice,
                itemQuantity: model.itemQuantity,
                itemLink: model.itemLink,
                itemStatus: model.itemStatus,
                guestName: model.guestName,
                guestMessage: model.guestMessage,
                itemTimestam: new Date().toISOString()
          }));
        await this.deleteItem(model.id);
        const models = await DataStore.query(Item);
        this.setState({
          models: models,
          updatingExisting: false,
          updatingModel: null
        });
    
      } catch (error) {
        console.log('Error updating model:', error);
      }
    }

    async addItem() {
        try {
            const newItem =  await DataStore.save(
                new Item({
                    "itemName": "Dummy Item",
                    "itemImageUrl": "https://www.katgpt.org/static/media/cake.fa9c659b.jpg",
                    "itemPrice": 123.45,
                    "itemQuantity": 1020,
                    "itemLink": "https://katgpt.org",
                    "itemStatus": "available",
                    "guestName": "nice guest name",
                    "guestMessage": "congrats",
                    "itemTimestam": new Date().toISOString()
                })
            );
            console.log(newItem);
            this.setState(prevState => ({
                models: [...prevState.models, newItem]
            }));
        } catch (error) {
            console.log("Error creating dummy item:", error)
        }
       
    }

    async handleSubmit(event) {
        const { name, imageUrl, price, quantity, link } = event.target.elements;
        const isLinkValid = link.checkValidity();
        const isImageUrlValid = !imageUrl.value || imageUrl.checkValidity();
        const imageUrlValue = imageUrl.value && imageUrl.value.length() > 0 ? imageUrl.value : "https://www.katgpt.org/static/media/cake.fa9c659b.jpg";
        if (isLinkValid && isImageUrlValid) {
            try {
                const newItem = await DataStore.save(
                  new Item({
                    itemName: name.value,
                    itemImageUrl: imageUrlValue,
                    itemPrice: parseFloat(price.value),
                    itemQuantity: parseInt(quantity.value),
                    itemLink: link.value,
                    itemStatus: "",
                    guestName: "",
                    guestMessage: "",
                    itemTimestam: new Date().toISOString()
                  })
                );
                this.setState(prevState => ({
                    models: [...prevState.models, newItem]
                }));
                // add any other logic for successful item creation
              } catch (error) {
                console.log('Error creating item:', error);
                // add any error handling logic here
              }
        } else {
            console.log("Error: bad url");
        }
        
    }

    // async getModels() {
    //     const models = await DataStore.query(Item);
    //     console.log(models);
    //     this.setState({
    //         models: models
    //     });
    // }

    setUpdatingItem(model) {
        const modelCopy = { ...model };
        this.setState({addingNew: false, updatingExisting: true, updatingModel: modelCopy})
    }

    addNew() {
        this.setState({addingNew: true, updatingExisting: false, updatingModel: null})
    }

    cancelAddNew() {
        this.setState({addingNew: false})
    }

    cancelUpdateExisting() {
        this.setState({updatingExisting: false, updatingModel: null})
    }

    render() {
        return (
            <div className="weddingBody">
              <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <img src={gift} alt="gift" className="cakeImg"/>
                <div className="padded-sides">
                    <p>
                      Katrian Registry
                      <Button variant="contained" color="primary"
                        onClick={()=>{this.deleteAll()}}>
                        <DeleteIcon/> Delete All
                      </Button>
                      <Button variant="contained"
                        onClick={()=>{this.addItem()}}>
                        <AbcIcon/> Add Dummy
                      </Button>
                      <Button variant="contained"
                        onClick={()=>{this.refresh()}}>
                        <RefreshIcon/> Refresh
                      </Button>
                      <Button variant="contained"
                        onClick={()=>{this.addNew()}}>
                        <AddIcon/> Add New
                      </Button>
                    </p>
                    <div className="registryList">
                    {this.state.addingNew === true ?
                    <form onSubmit={this.handleSubmit}>
                        <div className="formLine">
                            <TextField required id="name" label="Item Name" variant="standard" />
                            <TextField id="imageUrl" label="Item Image URL" variant="standard"
                                InputProps={{
                                    pattern: "^(http|https)://.*$",
                                    title: "Please enter a valid URL starting with http or https",
                                  }}/>
                            <TextField required id="price" type="number"
                                InputProps={{
                                  inputProps: {
                                    step: "0.01",
                                    min: "0"
                                  }
                                }}
                                label="Item Price" variant="standard" />
                            <TextField required id="quantity" label="Quantity" variant="standard"
                                defaultValue="1"
                                type="number"
                                InputProps={{
                                  inputProps: {
                                    step: "1",
                                    min: "1"
                                  }
                                }}/>
                            <TextField required id="link" label="URL" variant="standard"
                                InputProps={{
                                    pattern: "^(http|https)://.*$",
                                    title: "Please enter a valid URL starting with http or https",
                                  }}/>
                            {/* <TextField id="guestName" label="Guest Name" variant="standard" /> */}
                            <Button variant="contained" type="submit">
                              Add Item
                            </Button>
                            <IconButton onClick={() => {this.cancelAddNew()}}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </form>
                    : this.state.updatingExisting === true ?
                    <></>
                    :
                    <></>}
                    {this.state.models.map(model => (
                        this.state.updatingExisting === true && this.state.updatingModel.id === model.id ?
                        <EditItemForm model={model} cancelCallback={this.cancelUpdateExisting} submitFunction={this.updateModel}></EditItemForm>
                        :
                        <div className="formLine">
                            <div className="temp">
                                {   model.itemImageUrl ?
                                    <img src={model.itemImageUrl} height="100" width="200" alt="item in gift registry"></img>
                                    : <></>
                                }
                                <div>{model.itemName}</div>
                                {/* <div>{model.itemImageUrl}</div> */}
                                <div>${model.itemPrice}</div>
                                <div>{model.itemQuantity}</div>
                                <div>{new Date(model.itemTimestam).toLocaleDateString()}</div>
                                <div>
                                    <a target="_blank"
                                      rel="noopener noreferrer"
                                        href={model.itemLink}>
                                        <LinkIcon></LinkIcon>
                                    </a>
                                </div>
                                {/* <div>{model.itemStatus}</div> */}
                                {/* <div>{model.itemTimestam}</div> */}
                                {/* <div>{model.guestName}</div> */}
                                {/* <div>{model.guestMessage}</div> */}
                            </div>
                            {/* <div>{model.itemName}</div>
                            <div>{model.itemImageUrl}</div>
                            <div>{model.itemLink}</div>
                            <div>{model.itemPrice}</div>
                            <div>{model.itemQuantity}</div>
                            <div>{model.itemStatus}</div>
                            <div>{model.itemTimestam}</div>
                            <div>{model.guestName}</div>
                            <div>{model.guestMessage}</div> */}
                            <div className="itemActions">
                                <Tooltip title="Edit item">
                                    <IconButton onClick={() => {this.setUpdatingItem(model)}}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete item">
                                    <IconButton onClick={() => {this.deleteItem(model.id)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
              </header>
            </div>
          );
    }

} export default Registry;