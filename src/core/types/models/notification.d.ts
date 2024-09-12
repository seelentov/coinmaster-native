interface INotification extends IBaseModel {
    header: string,
    text: string,
    is_checked: boolean,
    route_path: IRouteData,
}
