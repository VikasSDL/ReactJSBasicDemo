import * as React from 'react';
import { Row, Col } from 'antd';
import './index.less';


export class Dashboard extends React.Component<any> {

    render() {
        return (
            <React.Fragment>
                <Row gutter={16}>
                    <Col
                        className={'dashboardCard'}
                        xs={{ offset: 1, span: 22 }}
                        sm={{ offset: 1, span: 22 }}
                        md={{ offset: 1, span: 11 }}
                        lg={{ offset: 1, span: 11 }}
                        xl={{ offset: 0, span: 6 }}
                        xxl={{ offset: 0, span: 6 }}
                    >
                        DASHBOARD
          </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Dashboard;
