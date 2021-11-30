window.dom={
    create(string){//用于创建节点
        const container=document.createElement('template');
        container.innerHTML=string.trim();
        return container.content.firstChild;
    },
    after(node,node2){//用于新增弟弟
        node.parentNode.insertBefore(node2,node.nextSibling)
    },
    before(node,node2){//用于新增哥哥
        node.parentNode.insertBefore(node2,node)
    },
    append(parent,child){//用于新增儿子
        parent.appendChild(child)
    },
    wrap(node,parent){//用于新增爸爸
        dom.before(node,parent)
        dom.append(parent,node)
    },
    remove(node){//用于删除节点
        node.parentNode.removeChild(node)
        return node
    },
    empty(node){//用于删除后代
        const arr=[]
        let x=node.firstChild
        while(x){
            arr.push(dom.remove(x))
            x=node.firstChild
        }
        return arr
    },
    attr(node,name,value){  //用于读写属性  //重载和适配
        if(arguments.length===3){
            node.setAttribute(name,value)//node[name]=value这个方式好像也可以
        }else if(arguments.length===2){
            return node.getAttribute(name)
        }
    },
    text(node,string){//用于读写文本内容
        if(arguments.length===2){
            if('innerText' in node){//适配，判断老的浏览器有没有这个innerText属性
                node.innerText=string
            }else{
                node.textContent=string
            }
        }else if(arguments.length===1){
            if('innerText' in node){//适配，判断老的浏览器有没有这个innerText属性
                return node.innerText
            }else{
                return node.textContent
            }
        }
    },
    html(node,string){//用于读写HTML内容
        if(arguments.length===2){
            node.innerHTML=string
        }else if(arguments.length===1){
            return node.innerHTML
        }
    },
    style(node,name,value){//用于修改style
        if(arguments.length===3){
            node.style[name]=value//dom.style(div,'color','red')
        }else if(arguments.length===2){
            if(typeof name==='string'){
                return node.style[name]//dom.style(div,'color')用于读取属性值
            }else if(name instanceof Object){//判断name是否是一个对象
                const object= name
                for(let key in object){
                    node.style[key]=object[key]//dom.style(div,{color:'red'})
                }
            }
        }
    },
    class:{
        add(node,className){//用于添加class
            node.classList.add(className)
        },
        remove(node,className){//用于删除class
            node.classList.remove(className)
        },
        has(node,className){//判读类名中是否有这个className
            return node.classList.contains(className)
        }
    },
    on(node,eventName,fn){//用于添加事件监听
        node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn){//用于删除事件监听
        node.removeEventListener(eventName,fn)
    },
    find(selector,scope){//用于获取标签或标签们
        return (scope||document).querySelectorAll(selector)
    },
    parent(node){//用于获取父元素
       return node.parentNode
    },
    children(node){//用于获取子元素
        return node.children
    },
    siblings(node){//用于获取兄弟姐妹元素
        return Array.from(node.parentNode.children).filter(n=>n!==node)
    },
    next(node){//用于获取弟弟
        let x=node.nextSibling
        while(x&&x.nodeType===3){
            x=x.nextSibling
        }
        return x
    },
    previous(node){//用于获取哥哥
        let x=node.previousSibling
        while(x&&x.nodeType===3){
            x=x.previousSibling
        }
        return x
    },
    each(nodeList,fn){//用于遍历所有节点
        for(let i=0;i<nodeList.length;i++){
            fn.call(null,nodeList[i])
        }
    },
    index(node){//用于获取排行老几
        const list=dom.children(node.parent)
        let i
        for(i=0;i<list.length;i++){
            if(list[i]===node){
                break
            }
        }
        return i
    }
};