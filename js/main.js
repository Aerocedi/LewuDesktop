
new Vue({
    el:'#app',
    data:{
    title:'Dashboard',
    navBrand:true,
    Dash:true,
    show:false,
    tab:false,
    form:false,
    Abt:false,
    Seet:false,
    rep:false,
    ala:"Hey there",
    mala:"i dey",
    Switch:true,
    line:'line',
    chart:'chart_div',
    width:'800px',
    height:'500px',
    truck:'Edit Truck',
    pag:"Personal",
    ste:" of 3",
    project:'Add Project',
    page:1,
    finalPage:3,
    con:"Add Employee",
    select: '',
    display:'block',
    disp:'none',
    home:1,
      type: [
         
        {id:'maintenance', name: 'maintenance'},
        {id:'Diesel allocation', name: 'Diesel allocation'},
      ]
    },
    methods:{
        changeTit:function(title){
            return this.title=title
        },
        showDash:function(){
            this.Dash=true,
            this.show=false
            this.tab=false,
            this.form=false,
            this.Abt=false,
            this.Seet=false
            this.changeTit('Dashboard')
        },
        showCom:function(){
            this.Dash=false,
            this.show=true,
            this.tab=false,
            this.form=false,
            this.Abt=false,
            this.Seet=false
            this.changeTit('Employees')
        },
        showTab:function(){
            this.Dash=false,
            this.show=false,
            this.tab=true,
            this.form=false,
            this.Abt=false,
            this.Seet=false
            this.changeTit('Trucks')

        },
        showPr:function(){
            this.Dash=false,
            this.show=false,
            this.tab=false,
            this.form=true,
            this.Abt=false,
            this.Seet=false
            this.changeTit('Projects')

        },
        showPA:function(){
            this.Dash=false,
            this.show=false,
            this.tab=false,
            this.form=false,
            this.Abt=true,
            this.Seet=false
            this.changeTit('Project Assignment')

        },
        showLog:function(){
            this.Dash=false,
            this.show=false,
            this.tab=false,
            this.form=false,
            this.Abt=false,
            this.Seet=true
            this.changeTit('Log')

        },

        showReport:function(){
            this.Dash=false,
            this.show=false,
            this.tab=false,
            this.form=false,
            this.Abt=false,
            this.Seet=false,
            this.rep=true,
            this.changeTit('Report')

        },

        stepForward:function(){
            this.page++
            if(this.page==2){
               
                this.pag=''
                this.con="Upload Picture"

            }
            if (this.page==3){
                this.con="Print Tag"
            }

        },


        stepBackward:function(){
            this.page--
            if(this.page==1){
                
                this.pag='Personal'
                this.con="Add Employee"
            }
            if(this.page==2){
               
                this.pag=''
                this.con="Upload Picture"

            }

        },


        homeNext:function(){
            this.home++
            

        },


        switchDisp:function(){
            this.Switch=!this.Switch
          
        },

        nextDetails:function(){
           this.disp='block'
           this.display='none'
        }
    }
    
})


