import { message } from 'antd';
import autobind from 'autobind-decorator';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import handleError from 'console/utils/handleError';
import GenericFormContainer from 'console/components/recipes/GenericFormContainer';
import RecipeForm from 'console/components/recipes/RecipeForm';

import { createRecipe } from 'console/state/recipes/actions';

@connect(
  null,
  {
    createRecipe,
    push,
  },
)
@autobind
export default class CreateRecipePage extends React.PureComponent {
  static propTypes = {
    createRecipe: PropTypes.func.isRequired,
    push: PropTypes.object.isRequired,
  };

  onFormFailure(err) {
    handleError('Recipe cannot be created.', err);
  }

  onFormSuccess(newId) {
    message.success('Recipe created');
    this.props.push(`/recipe/${newId}/`);
  }

  async formAction(formValues) {
    return this.props.createRecipe(formValues);
  }

  render() {
    return (
      <div className="content-wrapper">
        <h2>Create New Recipe</h2>
        <GenericFormContainer
          form={RecipeForm}
          formAction={this.formAction}
          onSuccess={this.onFormSuccess}
          onFailure={this.onFormFailure}
          formProps={{ isCreationForm: true }}
        />
      </div>
    );
  }
}
