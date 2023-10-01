import { LightningElement } from 'lwc';
import saveRecords from '@salesforce/apex/CreateUpdateRecordsController.saveRecords';
import {NavigationMixin} from 'lightning/navigation';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class CreateUpdateDeleteRecordsComponent extends NavigationMixin(LightningElement) {
    customerName;
    email;
    mobile;
    status;
    isLoading = false;
    recordId;

    customerStatus = [
        { label: 'Active', value: 'Active' },
        { label: 'In Active', value: 'inActive' }
    ];

    get options() {
        return [
            { label: 'Active', value: 'Active' },
            { label: 'In Active', value: 'inActive' }
        ];
    }

    //getting records on change
    handleChange(event){
        let eventName = event.target.name;
        if(eventName=='customerName'){
            this.customerName = event.target.value;
        }else if(eventName=='email'){
            this.email = event.target.value;
        }else if(eventName=='mobile'){
            this.mobile = event.target.value;
        }else if(eventName=='active'){
            this.status = event.detail.value;
        }
        console.log('---customerName--',this.customerName);
        console.log('--- email--',this.email);
        console.log('--- mobile--',this.mobile);
        console.log('--- status---',this.status);
    }

    handleSave(){
        this.isLoading = true;
        saveRecords({customerName:this.customerName,email:this.email,mobile:this.mobile,status:this.status,recordId:this.recordId})
        .then(result=>{
            this.isLoading = false;
            this.recordId = result;
             if(this.recordId){
                 this.showSuccessHandle();
             }
            console.log('--- customer id--',result);
        })
        .catch(error=>{
            console.error('--- error--',error);
        })
    }

    //Navigation to the view record
    navigateonrecordsview(){
        this[NavigationMixin.Navigate]({
            type : 'standard__recordPage',
            attributes : {
                recordId : this.recordId,
                objectApiName : 'Customer__c',
                actionName :'view'
            }
        })
    }
    //Navigation to the edit record
    navigateonrecordsedit(){
        this[NavigationMixin.Navigate]({
            type : 'standard__recordPage',
            attributes : {
                recordId : this.recordId,
                objectApiName : 'Customer__c',
                actionName :'edit'
            }
        })
    }
     //Navigation to the new record
    navigateonrecordsnew(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Customer__c',
                actionName :'new'
            }
        })
    }
     //Navigation to the list view
    navigateonrecordsList(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Customer__c',
                actionName :'list'
            },
            state:{
                filterName : 'Recent'
            }
        })
    }
    navigateonrecordsHome(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Customer__c',
                actionName :'home'
            }
        })

    }
    navigateonrecordsTabCustomer(){
         this[NavigationMixin.Navigate]({
            type : 'standard__navItemPage',
            attributes : {
                
                apiName :'Record_Manage'
            }
        })
    }
    //navigate url
    navigateonrecordsURL(){
         this[NavigationMixin.Navigate]({
            type : 'standard__webPage',
            attributes : {
                "url":"https://www.linkedin.com/in/ashish-madhukar-19928210a/"
            }
        })
    }
    //toast message
    showSuccessHandle(){
        const evt = new ShowToastEvent({
            title:'Success',
            message:'Record created successfully!',
            variant : 'success',
            mode:'dismissable'
        });
        this.dispatchEvent(evt);
    }
}