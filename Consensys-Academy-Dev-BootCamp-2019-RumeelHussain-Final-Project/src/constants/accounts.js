
const docStatus = [{value: 0, label: 'Pending'}, {value: 1, label: 'Verified'}, {value: 2, label: 'Rejected'}];

export default  {
  types: [{value: 0, label: 'Verifier'}, {value: 1, label: 'Requester'}],
  docStatus: docStatus,
  getStatusLabel: (value) => {
    let label = {};
    docStatus.map((status)=>{
      if(status.value === value){
        label = status;
      }
    });
    return label;
  }
}