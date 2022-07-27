//Clase Nodo
class Node{
    constructor(data, id){
      this.data = data;
      this.id = id;
      this.left = null;
      this.right = null;
    }
  }
  
//Clase Arbol Binario
class BinarySearchTree{
    
    constructor(){
      this.root = null;
    }
  
    insert(data,id){
        var newNode = new Node(data,id);
  
        if(this.root === null)
            this.root = newNode;
        else
            this.insertNode(this.root, newNode);
    }

    insertNode(node, newNode){
        if(newNode.data < node.data){
            if(node.left === null)
                node.left = newNode;
            else
                this.insertNode(node.left, newNode); 
        }
        else{
        if(node.right === null)
            node.right = newNode;
        else
            this.insertNode(node.right,newNode);
        }
    }
    search(node, data){
        if(node === null)
            return null;
        else if(data < node.data)
            return this.search(node.left, data);
        else if(data > node.data)
            return this.search(node.right, data);
        else
            return node;
    }

    inorder(node){
        if(node !== null){
            this.inorder(node.left);
            console.log(node.data);
            this.inorder(node.right);
        }
    }
    
    preorder(node){
        if(node !== null){
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }   
    }

    postorder(node){
        if(node !== null){
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.data);
        }
    }

    getRootNode(){
        return this.root;
    }
}

function search_corte() {
    var BST = new BinarySearchTree();
    BST.insert("RIB-EYE", 1);
    BST.insert("ARRACHERA",2);
    BST.insert("TOMAHAWK",3);
    BST.insert("BRISKET",4);
    BST.insert("T-BONE",5);
    BST.insert("CHAMBERETE",6);
    BST.insert("PICAÑA",7);
    BST.insert("PULPA TAQUERA",8);
    BST.insert("CARNE PARA HAMBURGUESA",9);

    var root = BST.getRootNode();
    let input = document.getElementById('searchbar').value;
    input=input.toUpperCase();
    let x = document.getElementsByClassName('card');
    let div = document.getElementById('alert');

    let item = BST.search(root,input);
    if (item) {
        console.log(item);
        for (i = 0; i < x.length; i++) { 
            if (!x[i].innerHTML.toUpperCase().includes(input)) {
                x[i].style.display="none";
            }
            else {
                x[i].style.display="list-item";
                div.style.display="none";
            }
        }
    }else{
        let alerta = "<p id='myalert' class='alerta' style='color: #ffffff; font-size: 16px;'>No se encontró el Corte</p>"
        div.innerHTML = alerta;
        div.style.display = "block";
    }

    if (input.length <= 0){
        for (i = 0; i < x.length; i++) { 
            x[i].style.display="list-item";
            div.style.display="none";
        }
    }
    
    // console.log('Recorrido In-Order : ');
    // BST.inorder(root);
    // console.log('--------------------------------------- : ');
    // console.log("Recorrido Post-Order :");
    // BST.postorder(root);
    // console.log('--------------------------------------- : ');
    // console.log("Recorrido Pre-Order :");
    // BST.preorder(root);
    // console.log('--------------------------------------- : ');
    
}

