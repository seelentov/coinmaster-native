import Error from "../../ui/Error/Error";
import ValuteListQueriable, { IValuteListQueriableProps } from "./ValuteListQueriable";
import ValuteListRendered, { IValuteListRenderedProps } from "./ValuteListRendered";

type IValuteListProps = {
    positions?: IPosition[],
    id?: string,
    req?: IValuteShowRequest
}
export function ValuteList({ id, req, positions }: IValuteListProps) {
    if (id && req) {
        return <ValuteListQueriable id={id} req={req} />
    }

    else if (positions) {
        return <ValuteListRendered positions={positions} />
    }

    else {
        return <Error />
    }
}