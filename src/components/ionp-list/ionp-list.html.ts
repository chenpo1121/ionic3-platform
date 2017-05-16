
let template = {
  divider: `
  <ion-item-divider color="light" *ngIf="group.style==='dividers'">
    {{group?.text}}
  </ion-item-divider>`,
  header: `
  <ion-list-header color="light" *ngIf="group.style==='header'">
    {{group?.text}}
  </ion-list-header>`,
  item: {
    left:
    {
      avatar: `
      <ion-avatar item-left *ngIf="item?.icon?.type==='avatar'">
        <img [src]="item.icon.src">
      </ion-avatar>`,
      thumbnail: `
      <ion-thumbnail item-left *ngIf="item?.icon?.type==='thumbnail'">
        <img [src]="item.icon.src">
      </ion-thumbnail>`,
      icon: `
      <ion-icon [name]="item.icon.name" item-left [color]="item.icon.color" [style.color]="item.icon.color" *ngIf="item?.icon?.type==='icon'">
      </ion-icon>`
    },
    center: {
      multiLine: `
      <ion-label *ngIf="item.title||item.subTitle">
        <h2 *ngIf="item.title">{{item.title}}</h2>
        <h3 *ngIf="item.subTitle">{{item.subTitle}}</h3>
        <p *ngIf="(item.title||item.subTitle)&&item.description">{{item.description}}</p>
      </ion-label>`,
      singleLine: `
      <ion-label *ngIf="(!item.title&&!item.subTitle)&&item.description">
        {{item.description}}
      </ion-label>`,
    },
    right: {
      note: `
      <ion-note item-right *ngIf="item?.input?.type==='note'">
        {{item.input.text}}
      </ion-note>`,
      icon: `
        <ion-icon [name]='item.input.name' item-right [color]="item.input.color" 
          [style.color]="item.input.color" *ngIf="item?.input?.type==='icon'"></ion-icon>`,
      button: `
      <button ion-button outline item-right *ngIf="item?.input?.type==='button'"
         (click)="inputClick(item);$event.stopPropagation();"> 
        {{item.input.text}}
      </button>`,
      toggle: `
      <ion-toggle checked="{{item.input.value}}" 
        *ngIf="item?.input?.type==='toggle'" (ionChange)="inputChanged($event,item)"></ion-toggle>
      `,
      text2: `
      <ion-input type="{{item.input.style}}" item-right 
        value="{{item.input.value}}" 
        placeholder="{{item.input.text}}" 
        (keyup.enter)="inputChanged($event,item);"
        (blur)="inputChanged($event,item)"
        *ngIf="item?.input?.type==='text'"></ion-input>`,
      text: `
      <ion-input type="{{item.input.style}}" item-right 
        value="{{item.input.value}}" 
        placeholder="{{item.input.text}}" 
        (keyup.enter)="inputChanged($event,item);$event.stopPropagation();"
        (blur)="inputChanged($event,item);$event.stopPropagation();"
        *ngIf="item?.input?.type==='text'"></ion-input>`,
      select: `
      <ion-select [ngModel]="item.input.value" *ngIf="item?.input?.type==='select'" 
        (ionChange)="inputChanged($event,item)"
        okText="{{ 'IONP_LIST_SELECT_OK' | translate }}" 
        cancelText="{{ 'IONP_LIST_SELECT_CANCEL' | translate }}">
        <ion-option value="{{option.value}}"  *ngFor="let option of item.input.options" >{{option.text}}</ion-option>
      </ion-select>`
    },
    content: ''
  },
  sliding: {
    options: `
    <ion-item-options side="right" *ngIf="item?.sliding?.length>0">
      <button ion-button [color]="option.color" [color]="option.color" [style.color]="option.color"  *ngFor="let option of item.sliding">
        <ion-icon [name]="option.name"></ion-icon>
        {{option.text}}
      </button>
    </ion-item-options>`,
    content: '',
  },
  itemsType: {
    sliding: '',
    text: '',
    button: ''
  }
};

template.item.content = `
  ${template.item.left.avatar}
  ${template.item.left.icon}
  ${template.item.left.thumbnail}

  ${template.item.center.multiLine}
  ${template.item.center.singleLine}

  ${template.item.right.note}
  ${template.item.right.icon}
  ${template.item.right.button}
  ${template.item.right.toggle}
  ${template.item.right.text}
  ${template.item.right.select}
`;

template.itemsType.text = `
  <div *ngIf="group.type==='text'">
  <!--item-->
    <ion-item ion-item *ngFor="let item of group.items">
      ${template.item.content}
    </ion-item>
  </div>`;

template.itemsType.button = `
  <div *ngIf="group.type==='button'">
    <!--item-->
    <button ion-item (click)="itemSelected(item)"  *ngFor="let item of group.items"  [attrs]="{'detail-none':!item.detail}">
      ${template.item.content}
    </button>
  </div>`;

template.itemsType.sliding = `
<button ion-item (click)="itemSelected(item)" [attrs]="{'detail-none':!item.detail}">
  ${template.item.content}
</button>`;

template.sliding.content = `
  <div *ngIf="group.type==='sliding'">
    <ion-item-sliding *ngFor="let item of group.items">
      <!--item-->
      ${template.itemsType.sliding}
      <!--sliding options-->
      ${template.sliding.options}
    </ion-item-sliding>
  </div>`;

let listTemplate = `
  <ion-list [attrs]="{'no-lines':list.nolines,'inset':list.inset}" *ngIf='list' >
    <ion-item-group *ngFor="let group of list.groups" >
      ${template.divider}
      ${template.header}
      ${template.itemsType.text}
      ${template.itemsType.button}
      ${template.sliding.content}
    </ion-item-group>
  </ion-list>`;

export let IonpListComponentTemplate = listTemplate;