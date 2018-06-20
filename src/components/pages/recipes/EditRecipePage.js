import { message } from 'antd';
import autobind from 'autobind-decorator';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import handleError from 'console/utils/handleError';
import GenericFormContainer from 'console/components/recipes/GenericFormContainer';
import LoadingOverlay from 'console/components/common/LoadingOverlay';
import RecipeForm from 'console/components/recipes/RecipeForm';
import QueryRecipe from 'console/components/data/QueryRecipe';
import QueryActions from 'console/components/data/QueryActions';

import { updateRecipe } from 'console/state/recipes/actions';
import { getRecipe } from 'console/state/recipes/selectors';
import { getRecipeForRevision } from 'console/state/revisions/selectors';
import { getUrlParamAsInt } from 'console/state/router/selectors';

@connect(
  (state, props) => {
    const recipeId = getUrlParamAsInt(props, 'recipeId');
    const recipe = getRecipe(state, recipeId, new Map());

    return {
      recipeId,
      recipe: getRecipeForRevision(state, recipe.getIn(['latest_revision', 'id']), new Map()),
    };
  },
  {
    updateRecipe,
  },
)
@autobind
export default class EditRecipePage extends React.PureComponent {
  static propTypes = {
    updateRecipe: PropTypes.func.isRequired,
    recipeId: PropTypes.number.isRequired,
    recipe: PropTypes.instanceOf(Map),
  };

  static defaultProps = {
    recipe: null,
  };

  onFormSuccess() {
    message.success('Recipe updated!');
  }

  onFormFailure(error) {
    handleError('Recipe cannot be updated.', error);
  }

  async formAction(formValues) {
    const { recipeId } = this.props;
    return this.props.updateRecipe(recipeId, formValues);
  }

  render() {
    const { recipeId, recipe } = this.props;

    return (
      <div className="content-wrapper edit-page">
        <QueryRecipe pk={recipeId} />
        <QueryActions />
        <LoadingOverlay requestIds={`fetch-recipe-${recipeId}`}>
          <h2>Edit Recipe</h2>
          <GenericFormContainer
            form={RecipeForm}
            formAction={this.formAction}
            onSuccess={this.onFormSuccess}
            onFailure={this.onFormFailure}
            formProps={{ recipe }}
          />
        </LoadingOverlay>
      </div>
    );
  }
}
