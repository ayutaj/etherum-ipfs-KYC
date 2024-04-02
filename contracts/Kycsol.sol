// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Kycsol{

    //user structre
    struct user {
        string fName;
        string lName;
        string dob;
        string nationality;
        string email_address;
        string account;
        string fathersName;
        string mothersName;
        string phoneNumber;
        string permanentaddress;
        string localaddress;
    }

    struct bank{
        string name;
        string id;
        string IFSC;
        string nationality;
        string account;
        string MICR;
        string branch;
        string district;
        string state;
    }

   
    
    mapping(string=>string) public mp_bank_name; //stores the account=>bankname
    mapping(string=>int) public mp_isUser;       //stores account=>int(0,1)
    mapping(string=>user) public mp_usermap;     //stores account=>user data
    mapping (string=>bank) public mp_accountBank; // stores account=>bank data
    mapping (string=>string[]) public mp_user_account_Data; // stores account, encryptedhash for user
    mapping (string=>string[]) public mp_bank_account_Data; //stores account, encryptedhash for bank
    
    mapping (string=>string) public mp_public_bankKey; // stores public key of bank, account=>pubkey
    mapping (string=>string) public mp_private_bankKey; // stores public key of bank, account=>privatekey

    mapping (string=>int) public mp_account_doc_bank; //check if account+doctype+bank exist
    mapping(string => string[]) public mp_self_status; //stores account=>[acc+doc+bank]

    string[] public bankList;  //stores [account1,account2]

    function fn_mp_isUser(string memory account)public view returns(int)
    {
        return mp_isUser[account];
    }
    function remove_mp_isUser(string memory account)public
    {
        mp_isUser[account]=0;
    }
    
    function add_bank(string memory name,string memory id,string memory IFSC,string memory nationality,string memory account, string memory MICR,string memory pubkey,string memory prikey,string memory district, string memory branch, string memory state) public {
        bank memory bk;
        bk.name=name;
        bk.id=id;
        bk.IFSC=IFSC;
        bk.account=account;
        bk.nationality=nationality;
        bk.MICR=MICR;
        bk.branch=branch;
        bk.district= district;
        bk.state=state;
        bankList.push(account);
        mp_bank_name[account]=name;
        mp_accountBank[account]=bk;
        mp_public_bankKey[name]=pubkey;
        mp_private_bankKey[name]=prikey;
    }
    function get_allbank()public view returns(string [] memory)
    {
        return bankList;
    }

    function add_user(string memory t_fname,string memory t_lname,string memory t_dob,string memory t_nation,string memory t_email, string memory t_account, string memory fathersName,string memory mothersName,string memory phoneNumber, string memory permanentaddress, string memory localaddress) public 
    {
        user memory us;
        us.fName=t_fname;
        us.lName=t_lname;
        us.dob=t_dob;
        us.nationality=t_nation;
        us.email_address=t_email;
        us.account=t_account;
        us.fathersName=fathersName;
        us.mothersName=mothersName;
        us.phoneNumber=phoneNumber;
        us.permanentaddress=permanentaddress;
        us.localaddress=localaddress;
        mp_isUser[t_account]=1;
        mp_usermap[t_account]=us;
    }

    

//new functions
    function add_data_for_verification(string memory account, string memory encrypt_hash_user,string memory encrypt_hash_bank, string memory bank_name,string memory acc_doc_bank, int val) public{
        mp_user_account_Data[account].push(encrypt_hash_user);
        mp_bank_account_Data[bank_name].push(encrypt_hash_bank);
        
        //change the self status
        mp_self_status[account].push(acc_doc_bank);
        //change the status
        mp_account_doc_bank[acc_doc_bank]=val;
    }
    function get_pending_applications_for_bank(string memory bankName) public view returns (string [] memory)
    {
        return mp_bank_account_Data[bankName];
    }
    
    function update_user_status(string memory account,string memory acc_doc_bank) public 
    {
        mp_self_status[account].push(acc_doc_bank);
    }
    function find_user_status(string memory account) public view returns(string[] memory)
    {
        return mp_self_status[account];
    }
    
    function alter_account_doc_bank(string memory str, int val) public
    {
        mp_account_doc_bank[str]=val;
    }
}